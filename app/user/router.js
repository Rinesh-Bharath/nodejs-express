import express from 'express';
import * as userCore from './core/index.js';
import * as userAddress from './address/index.js';

const userRouter = express.Router();

// User Core Services
userRouter.post('/create', userCore.create);
userRouter.get('/read', userCore.read);
userRouter.put('/update', userCore.update);
userRouter.delete('/delete', userCore.remove);
userRouter.post('/search', userCore.search);

// User Address Services
userRouter.post('/address/create', userAddress.create);
userRouter.get('/address/read', userAddress.read);
userRouter.put('/address/update', userAddress.update);
userRouter.delete('/address/delete', userAddress.remove);

export default userRouter;
