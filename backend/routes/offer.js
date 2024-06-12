import { Router } from 'express';
import offerSchema from '../models/offerModel.js';
import { offerDB } from '../server.js';
import validate from '../middlewares/validate.js';
import isAdmin from '../middlewares/isAdmin.js';

const router = Router();

router.post('/', isAdmin, validate(offerSchema), async (req, res) => {
    try {
        const { products, offerPrice } = req.body;
        const newOffer = await offerDB.insert({ products, offerPrice });
        res.status(201).json({ message: 'Offer added successfully.', offer: newOffer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
})

export default router;