import { fetch_one_from_db } from '../../../shared/mongodb.js';
import { readSchema } from './joi_schema.js';

const logging_key = 'read a user';

export async function read (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.query)}`);
  try {
    const inputData = await readSchema.validateAsync(req.query);
    const project = {
      password: 0
    };
    const USER = await fetch_one_from_db(logging_key, process.env.TABLE_USER, inputData, project);
    console.log(`${logging_key} - User Detail - ${JSON.stringify(USER)}`);
    res.data = USER || {};
    next();
  } catch (err) {
    next(err);
  }
};
