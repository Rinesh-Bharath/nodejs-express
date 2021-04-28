import { v4 as uuid } from 'uuid';
import { insert_into_db } from '../../../shared/mongodb.js';
import { createSchema } from './joi_schema.js';
import { validate_email_exists } from './validate.js';

const logging_key = 'create a user';

export async function create (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.body)}`);
  try {
    req.body.user_id = uuid();
    const DATA = await createSchema.validateAsync(req.body);
    await validate_email_exists(logging_key, DATA.email);
    const USER = await insert_into_db(logging_key, process.env.TABLE_USER, DATA);
    console.log(`${logging_key} - User Detail - ${JSON.stringify(USER)}`);
    res.data = USER;
    next();
  } catch (err) {
    next(err);
  }
};
