import express from 'express';
import cors from 'cors';

import userRouter from './user/router.js';

const app = express();
const port = 3000;

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

// Prefix for router
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
