import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NO_JWT_SECRET } from '../constants/errors.js';
import { AuthenticatedRequest } from '../interfaces/middleware.interface.js';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

    const decoded = jwt.verify(token, process.env.jwtSecret) as JwtPayload;

    if (decoded && typeof decoded.userId === 'string') {
      (req as AuthenticatedRequest).userId = decoded.userId;
      next();
    } else {
      return res.status(401).send('Unauthorized');
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send('Unauthorized');
  }
};

export default authMiddleware;
