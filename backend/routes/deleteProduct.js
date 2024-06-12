import { Router } from 'express';
import { menuDB } from '../server.js';
import isAdmin from '../middlewares/isAdmin.js';

const router = Router();

router.delete('/:productId', isAdmin, async (req, res, next) => {
    try {
        const { productId } = req.params;
        const numericProductId = parseInt(productId);

        const existingProduct = await menuDB.findOne({ id: numericProductId});
        if (!existingProduct) return res.status(404).json({ message: 'Product not found.' });
        await menuDB.remove({ id: productId }, { multi: false });

        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default router;