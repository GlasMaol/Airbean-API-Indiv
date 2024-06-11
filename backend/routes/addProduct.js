import { Router } from 'express';
import menuSchema from '../models/menuModel.js';
import { menuDB } from '../server.js';
import validate from '../middlewares/validate.js';
import isAdmin from '../middlewares/isAdmin.js';

const router = Router();

router.post('/', isAdmin, validate(menuSchema), async (req, res, next) => {
    console.log('Received request with body:', req.body);
    try {
        const { error } = menuSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { id, title, desc, price, offer } = req.body;

        const existingProduct = await menuDB.findOne({ id });
        if (existingProduct) return res.status(400).json({ message: 'Product already exists' });

        let productId;
        do {
            productId = (Math.floor(1000 + Math.random() * 9000)).toString(); // Generate random productId
        } while (await menuDB.findOne({ productId }));

        const newProduct = await menuDB.insert({ id, title, desc, price, offer });
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default router;