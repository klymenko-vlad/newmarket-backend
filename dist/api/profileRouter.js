import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import { validatePassword } from '../utils/validationFunctions.js';
import { ERROR_INVALID_PASSWORD, ERROR_SERVER_ERROR, } from '../constants/errors.js';
const profileRouter = express.Router();
profileRouter.put('/update', authMiddleware, async (req, res) => {
    try {
        const { userId } = req;
        const { name, email, role } = req.body;
        const filteredBody = {};
        if (name && name.length > 1)
            filteredBody.name = name;
        if (email && email.length > 1)
            filteredBody.email = email;
        if (role)
            filteredBody.role = role;
        const updatedUser = await UserModel.findByIdAndUpdate(userId, filteredBody, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(ERROR_SERVER_ERROR);
    }
});
profileRouter.post('/updatePassword', authMiddleware, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!validatePassword(newPassword)) {
            res
                .status(401)
                .send({ error: 'Invalid new Password. At least 8 characters' });
        }
        const user = await UserModel.findById(req.userId).select('+password');
        if (!user) {
            return res.status(404).send({ error: 'User is not found' });
        }
        const isNewPassword = await bcrypt.compare(newPassword, user.password);
        if (isNewPassword) {
            return res.status(401).send({ error: 'Passwords are the same' });
        }
        const isPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isPassword) {
            return res.status(401).send({ error: ERROR_INVALID_PASSWORD });
        }
        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();
        return res.status(200).send({ status: 'Updated' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: ERROR_SERVER_ERROR });
    }
});
export default profileRouter;
//# sourceMappingURL=profileRouter.js.map