import { Router } from 'express';
import { menuDB } from '../server.js';
import isAdmin from '../middlewares/isAdmin.js';

const router = Router();

router.delete('/:productId', isAdmin, async (req, res, next) => {
    try {
        const { productId } = req.params;
        const numericProductId = parseInt(productId);

        console.log(`Received request to delete product with id: ${numericProductId}`);

        const existingProduct = await menuDB.findOne({ id: numericProductId });
        if (!existingProduct) {
            console.log(`Product not found with id: ${numericProductId}`);
            return res.status(404).json({ message: 'Product not found.' });
        }

        const numRemoved = await menuDB.remove({ id: numericProductId }, { multi: false });

        if (numRemoved === 0) {
            console.log(`Failed to delete product with id: ${numericProductId}`);
            return res.status(500).json({ message: 'Failed to delete product.' });
        }

        console.log(`Product deleted successfully with id: ${numericProductId}`);
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (err) {
        console.error('Error deleting product:', err);
        next(err);
    }
});

export default router;