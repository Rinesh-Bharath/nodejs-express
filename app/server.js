import express from 'express';
import cors from 'cors';

import { set_environment } from '../shared/env.js';
import { responseHandler, errorHandler } from '../shared/handler.js';
import userRouter from './user/router.js';

const app = express();

set_environment();

app.use(cors());

// Get an instance of the express Router
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome nGRID Students!');
});

// Ping route for health checks - used in production env
router.get('/ping', function (req, res) {
  res.status(200).json({
    'success': true,
    'message': 'Ok'
  });
});

router.use('/user', userRouter);

// custom response handler
router.use(responseHandler);

// error handler
router.use(errorHandler);

// Prefix for router
app.use('/', router);

app.listen(process.env.NODE_PORT, () => {
  console.log(`nGRID app listening at http://localhost:${process.env.NODE_PORT}`);
});
