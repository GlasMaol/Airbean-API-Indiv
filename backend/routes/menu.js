import { Router } from 'express';
import { readFileSync } from 'fs';
import { menuDB } from '../server.js'

const router = Router();

router.get('/', async (req, res) => {
    try {
        const menuItems = await menuDB.find({});
        res.json(menuItems);
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
})

export default router;