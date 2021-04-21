// const _ = require('lodash');
import { fetch_one_from_db } from '../../../shared/mongodb.js';

const logging_key = 'read a user';

export async function read (req, res, next) {
  const filter = req.params;
  console.log(`${logging_key} - started - ${JSON.stringify(filter)}`);
  try {
    const USER = await fetch_one_from_db(logging_key, process.env.TABLE_USER, 123);
    console.log(`${logging_key} - User Detail - ${JSON.stringify(USER)}`);
    res.data = USER || {};
    next();
  } catch (err) {
    console.log('err catched');
    next(err);
  }
};
