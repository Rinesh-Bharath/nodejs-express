import express from 'express';
import * as productCore from './core/index.js';

const productRouter = express.Router();

// Product Core Services
productRouter.post('/create', productCore.create);
productRouter.post('/create_promise', productCore.create_promise);
productRouter.get('/read', productCore.read);
productRouter.put('/update', productCore.update);
productRouter.delete('/delete', productCore.remove);
productRouter.post('/search', productCore.search);

export default productRouter;
