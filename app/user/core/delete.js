import { remove_one_from_db } from '../../../shared/mongodb.js';
import { deleteSchema } from './joi_schema.js';
import { validate_user_id_exists } from './validate.js';

const logging_key = 'delete a user';

export async function remove (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.body)}`);
  try {
    const DATA = await deleteSchema.validateAsync(req.body);
    const USER = await validate_user_id_exists(logging_key, DATA.user_id);
    await remove_one_from_db(logging_key, process.env.TABLE_USER, DATA);
    console.log(`${logging_key} - User Deleted - ${JSON.stringify(USER)}`);
    res.data = USER || {};
    next();
  } catch (err) {
    next(err);
  }
};
