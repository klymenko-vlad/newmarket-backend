import jwt from 'jsonwebtoken';
import { NO_JWT_SECRET } from '../constants/errors.js';
const authMiddleware = (req, res, next) => {
    if (!process.env.jwtSecret) {
        console.error(NO_JWT_SECRET);
        return res.status(500).send('Something is went wrong');
    }
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send('Unauthorized');
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.jwtSecret);
        if (decoded && typeof decoded.userId === 'string') {
            req.userId = decoded.userId;
            next();
        }
        else {
            return res.status(401).send('Unauthorized');
        }
    }
    catch (error) {
        console.error(error);
        return res.status(401).send('Unauthorized');
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map