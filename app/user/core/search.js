import { fetch_from_db } from '../../../shared/mongodb.js';
import { searchSchema } from './joi_schema.js';

const logging_key = 'search a user';

export async function search (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.body)}`);
  try {
    const DATA = await searchSchema.validateAsync(req.body);
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);

    const project = {
      _id: 0,
      password: 0
    };
    const USER = await fetch_from_db(logging_key, process.env.TABLE_USER, DATA, project, { limit, skip });
    console.log(`${logging_key} - User Detail - ${JSON.stringify(USER)}`);
    res.data = USER || [];
    next();
  } catch (err) {
    next(err);
  }
};
