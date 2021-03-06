import express from 'express';
import * as auth from './index.js';

const authRouter = express.Router();

authRouter.post('/login', auth.login, auth.access_token, auth.refresh_token);

authRouter.post('/signup', auth.signup, auth.access_token, auth.refresh_token);

authRouter.post('/refresh', auth.refresh, auth.access_token);

export default authRouter;
