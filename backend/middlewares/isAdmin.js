import { database } from '../server.js';

const isAdmin = async (req, res, next) => {
    const userId = req.query.userid;

    if (!userId) {
        return res.status(401).json({ message: 'No user ID provided' });
    }
    try {
        const user = await database.findOne({ userId });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied, admin only.' })
        }
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to authenticate user.' })
    }
};

export default isAdmin;