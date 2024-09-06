import { validateEmail, validatePassword, } from '../utils/validationFunctions.js';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel.js';
import { ERROR_NO_JWT_SECRET, ERROR_SERVER_ERROR, ERROR_INVALID_EMAIL, ERROR_INVALID_PASSWORD, } from '../constants/errors.js';
import { ERROR_NAME_NOT_PROVIDED, ERROR_USER_ALREADY_EXISTS, } from '../constants/signupRouterErrors.js';
const signupRoutes = express.Router();
signupRoutes.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        if (email.length < 1)
            return res.status(401).send({ status: false });
        if (!validateEmail(email))
            return res.status(401).send({ status: false });
        const user = await UserModel.findOne({ email: email.toLowerCase() });
        if (user)
            return res.status(200).send({ status: false });
        return res.status(200).send({ status: true });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(ERROR_SERVER_ERROR);
    }
});
signupRoutes.post('/', async (req, res) => {
    try {
        const { name, email, password, profilePicUrl, role } = req.body;
        if (!validateEmail(email))
            return res.status(401).json({ error: ERROR_INVALID_EMAIL });
        if (!validatePassword(password))
            return res.status(401).json({ error: ERROR_INVALID_PASSWORD });
        if (!name) {
            return res.status(401).json({ error: ERROR_NAME_NOT_PROVIDED });
        }
        let user = await UserModel.findOne({ email: email.toLowerCase() });
        if (user) {
            return res.status(401).json({ error: ERROR_USER_ALREADY_EXISTS });
        }
        user = new UserModel({
            name,
            email: email.toLowerCase(),
            password,
            profilePicUrl,
            role,
        });
        user.password = await bcrypt.hash(password, 12);
        await user.save();
        if (!process.env.jwtSecret) {
            console.error(ERROR_NO_JWT_SECRET);
            return res.status(500).send(ERROR_SERVER_ERROR);
        }
        const payload = { userId: user._id };
        jwt.sign(payload, process.env.jwtSecret, { expiresIn: '14d' }, (err, token) => {
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
export default signupRoutes;
//# sourceMappingURL=signupRouter.js.map