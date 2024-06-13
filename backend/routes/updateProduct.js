import { Router } from "express";
import menuUpdateSchema from "../models/menuUpdateModel.js";
import { menuDB } from '../server.js';
import validate from "../middlewares/validate.js";
import isAdmin from "../middlewares/isAdmin.js";
import getTimeStamp from "../utilities/timeStamp.js";

const router = Router();

router.put('/:productId', isAdmin, validate(menuUpdateSchema), async (req, res, next) => {
    console.log('Received request to update product with id:', req.params.productId);
    try {
        const { error } = menuUpdateSchema.validate(req.body);
        if (error) {
            console.error('Validation error:', error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }

        const { productId } = req.params;
        const { title, desc, price, offer } = req.body;

        const existingProduct = await menuDB.findOne({ id: parseInt(productId) });

        if (!existingProduct) {
            console.error('Product not found with id:', productId);
            return res.status(404).json({ message: 'Product not found.' });
        }

        const updateFields = {};

        if (title) updateFields.title = title;
        if (desc) updateFields.desc = desc;
        if (price) updateFields.price = parseFloat(price);
        if (offer) updateFields.offer = offer;

        if (Object.keys(updateFields).length > 0) {
            const editedAt = getTimeStamp();
            updateFields.editedAt = editedAt;
        }

        const updatedProduct = await menuDB.update({ id: parseInt(productId) }, { $set: updateFields }, { returnUpdatedDocs: true });
        console.log('Product updated successfully:', updatedProduct);

        res.status(200).json({ message: 'Product updated successfully.', product: updatedProduct });
    } catch (err) {
        console.error('Error updating product:', err);
        next(err);
    }
});

export default router;