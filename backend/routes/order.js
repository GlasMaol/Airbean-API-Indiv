import { Router } from "express";
import orderSchema from "../models/orderModel.js";
import { db, orderNumberDB, offerDB, orderDB } from "../server.js";
import getTimeStamp from "../utilities/timeStamp.js";

const guestUserId = 'guest';
const router = Router();

router.post('/create/:userId', async (req, res, next) => {
    try {
        let { userId } = req.params;
        if (userId === 'guest') {
            userId = guestUserId;
        }

        // Fetch user's cart items
        const cartItems = await db.find({ userId });
        if (!cartItems.length) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Check if each cart item has the `productId` property
        cartItems.forEach(item => {
            if (!item.productId) {
                console.log('Cart item missing productId:', item);
            }
        });

        const items = cartItems.map(item => ({
            productId: item.productId,  // Use the `productId` property
            title: item.title,
            desc: item.desc,
            price: item.price,
            quantity: item.quantity ? Number(item.quantity) : 1
        }));

        console.log('Items:', items);

        // Calculate total with potential offers
        const total = await applyOffer(items);

        const orderNumber = await getNextOrderNumber();
        const newOrder = {
            userId,
            items,
            timeStamp: getTimeStamp(),
            total,
            orderNumber
        };

        const { error } = orderSchema.validate(newOrder);
        if (error) {
            console.log('Validation error', error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }

        const createdOrder = await orderDB.insert(newOrder);
        res.status(201).json({ message: 'Order created successfully', order: createdOrder });
        await db.remove({ userId }, { multi: true });

    } catch (err) {
        console.error(err);
        next(err);
    }
});

// Helper function to generate order number
async function getNextOrderNumber() {
    try {
        const updatedDoc = await orderNumberDB.update({}, { $inc: { getNextOrderNumber: 1 } }, { returnUpdatedDocs: true });
        if (updatedDoc) {
            return updatedDoc.getNextOrderNumber;
        } else {
            const newDoc = { getNextOrderNumber: 1 };
            await orderNumberDB.insert(newDoc);
            return newDoc.getNextOrderNumber;
        }
    } catch (error) {
        console.error(error, 'Error fetching next order number');
        throw error; // Rethrow the error to be caught by the caller
    }
}

// Function to apply offers and calculate the total price
async function applyOffer(items) {
    const offers = await offerDB.find({});
    console.log('Offers from DB:', offers);

    let newTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log('Initial total:', newTotal);

    offers.forEach(offer => {
        const offerProducts = offer.products.map(String); // Convert to string for matching
        const cartProductIds = items.map(item => item.productId);
        console.log('Checking offer:', offer);
        console.log('Cart product IDs:', cartProductIds);

        // Ensure offerProducts are in the same format as cartProductIds
        const isMatch = offerProducts.every(offerProductId =>
            cartProductIds.includes(offerProductId)
        );

        if (isMatch && offer.offerPrice < newTotal) {
            newTotal = offer.offerPrice;
            console.log('Offer applied. New total:', newTotal);
        }
    });
    return newTotal;
}

export default router;