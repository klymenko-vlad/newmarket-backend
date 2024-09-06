import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authMiddleware from '../../middleware/auth.middleware.js';
import UserModel from '../../models/UserModel.js';
import { validateEmail } from '../../utils/validationFunctions.js';
import { ERROR_INVALID_CREDENTIALS, ERROR_PASSWORD_LENGTH, } from './constants.js';
import { ERROR_INVALID_EMAIL, ERROR_NO_JWT_SECRET, ERROR_SERVER_ERROR, } from '../../constants/errors.js';
const authRouter = express.Router();
authRouter.get('/', authMiddleware, async (req, res) => {
    try {
        const { userId } = req;
        const user = await UserModel.findById(userId).select('-__v');
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(ERROR_SERVER_ERROR);
    }
});
authRouter.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (!validateEmail(email))
        return res.status(401).send(ERROR_INVALID_EMAIL);
    if (password.length < 6) {
        return res.status(401).send(ERROR_PASSWORD_LENGTH);
    }
    try {
        const user = await UserModel.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user)
            return res.status(401).json({ error: ERROR_INVALID_CREDENTIALS });
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(401).json({ error: ERROR_INVALID_CREDENTIALS });
        }
        const payload = { userId: user._id };
        if (!process.env.jwtSecret) {
            throw new Error(ERROR_NO_JWT_SECRET);
        }
        jwt.sign(payload, process.env.jwtSecret, { expiresIn: '24d' }, (err, token) => {
            if (err)
                throw err;
            res.status(200).json({ token });
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(ERROR_SERVER_ERROR);
    }
});
export default authRouter;
//# sourceMappingURL=authRouter.js.map