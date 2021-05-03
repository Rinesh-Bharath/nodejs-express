import express from 'express';
import * as mongoDB from './mongodb/index.js';

const userRouter = express.Router();

// MongoDB Core Services
userRouter.post('/createCollection', mongoDB.create_collection);
userRouter.post('/createIndexes', mongoDB.create_index);

export default userRouter;
