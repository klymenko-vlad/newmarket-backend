import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import connectDb from './db/connectDB.func.js';
import itemRouter from './api/itemRouter.js';
import authRouter from './api/authRouter.js';
import buyRouter from './api/buyRouter.js';
import signupRoutes from './api/signupRouter.js';
import profileRouter from './api/profileRouter.js';

const app = express();

dotenv.config({ path: './.env' });

app.use(
  cors({
    origin: '*',
    methods: '*',
  }),
);

app.use(helmet());

const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(ExpressMongoSanitize());

app.use(compression());

app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

connectDb();

app.get('/', (req, res) => {
  res.send('Welcome to the root path!');
});

app.use('/api/signup', signupRoutes);
app.use('/api/auth', authRouter);
app.use('/api/item', itemRouter);
app.use('/api/profile', profileRouter);
app.use('/api/buy', buyRouter);

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
