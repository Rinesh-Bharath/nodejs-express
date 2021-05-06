import express from 'express';
import * as auth from './core/index.js';

const authRouter = express.Router();

authRouter.post('/login', auth.login);

export default authRouter;
