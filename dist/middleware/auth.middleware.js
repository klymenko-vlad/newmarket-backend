import jwt from 'jsonwebtoken';
import { ERROR_NOT_AUTHENTICATED, ERROR_NO_JWT_SECRET, ERROR_SERVER_ERROR, } from '../constants/errors.js';
const authMiddleware = (req, res, next) => {
    if (!process.env.jwtSecret) {
        console.error(ERROR_NO_JWT_SECRET);
        return res.status(500).send(ERROR_SERVER_ERROR);
    }
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send(ERROR_NOT_AUTHENTICATED);
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.jwtSecret);
        if (decoded && typeof decoded.userId === 'string') {
            req.userId = decoded.userId;
            next();
        }
        else {
            return res.status(401).send(ERROR_NOT_AUTHENTICATED);
        }
    }
    catch (error) {
        console.error(error);
        return res.status(401).send(ERROR_SERVER_ERROR);
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map