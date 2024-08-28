import express, { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import authMiddleware from '../middleware/auth.middleware.js';
import UserModel from '../models/UserModel.js';
import { AuthenticatedRequest } from '../interfaces/middleware.interface.js';
import { NO_JWT_SECRET, PASSWORD_LENGTH } from '../constants/errors.js';
import { validateEmail } from '../utils/validationFunctions.js';

const authRouter = express.Router();

authRouter.get(
  '/',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;

    try {
      const user = await UserModel.findById(userId).select('-__v');

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Server error');
    }
  },
);

authRouter.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) return res.status(401).send('Invalid email');
  if (password.length < 6) {
    return res.status(401).send(PASSWORD_LENGTH);
  }

  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
      '+password',
    );

    if (!user)
      return res
        .status(401)
        .json({ error: 'Invalid credential. Please try again' });

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res
        .status(401)
        .json({ error: 'Invalid credential. Please try again' });
    }

    const payload = { userId: user._id };

    if (!process.env.jwtSecret) {
      throw new Error(NO_JWT_SECRET);
    }
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: '24d' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      },
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

export default authRouter;
