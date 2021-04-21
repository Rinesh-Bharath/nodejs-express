import express from 'express';
import cors from 'cors';

import { set_environment } from '../shared/env.js';
import userRouter from './user/router.js';

const app = express();

set_environment();

const userResponse = function (req, res) {
  res.status(200).json({
    'success': true,
    'data': res.data || 'Ok'
  });
};

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

router.use('/user', userRouter, userResponse);

// error handler
router.use(function (err, req, res, next) {
  res.status(404).json({
    'success': false,
    'data': {
      'error': [{
        code: err.statusCode,
        type: err.name,
        description: err.message
      }]
    }
  });
});

// Prefix for router
app.use('/', router);

app.listen(process.env.NODE_PORT, () => {
  console.log(`nGRID app listening at http://localhost:${process.env.NODE_PORT}`);
});
