import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { responseHandler, errorHandler } from '../shared/handler.js';
import { verify_token } from './authentication/verify_token.js';
import authRouter from './authentication/router.js';
import devopsRouter from './devops/router.js';
import userRouter from './user/router.js';
import productRouter from './product/router.js';

const app = express();
app.use(cors());
app.use(express.json());

// Configure env variables
dotenv.config();

// Get an instance of the express Router
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome nGRID Students!');
});

router.get('/env', (req, res) => {
  console.log(process.env);
  res.send('Environment Variables are consoled!');
});

// Ping route for health checks - used in production env
router.get('/ping', function (req, res) {
  res.status(200).json({
    'success': true,
    'message': 'Ok'
  });
});

router.use('/auth', authRouter);

router.use('/devops', verify_token, devopsRouter);

router.use('/user', verify_token, userRouter);

router.use('/product', verify_token, productRouter);

// custom response handler
router.use(responseHandler);

// error handler
router.use(errorHandler);

// Prefix for router
app.use('/', router);

app.listen(process.env.NODE_PORT, () => {
  console.log(`nGRID app listening at http://localhost:${process.env.NODE_PORT}`);
});
