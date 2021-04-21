import { fetch_one_from_db } from '../../../shared/mongodb.js';

const logging_key = 'read a user';

export async function read (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.params)}`);
  try {
    const USER = await fetch_one_from_db(logging_key, process.env.TABLE_USER, req.params);
    console.log(`${logging_key} - User Detail - ${JSON.stringify(USER)}`);
    res.data = USER || {};
    next();
  } catch (err) {
    next(err);
  }
};
