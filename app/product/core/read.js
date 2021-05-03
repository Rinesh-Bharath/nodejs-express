import { fetch_one_from_db } from '../../../shared/mongodb.js';
import { readSchema } from './joi_schema.js';

const logging_key = 'read a product';

export async function read (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.query)}`);
  try {
    const inputData = await readSchema.validateAsync(req.query);
    const PRODUCT = await fetch_one_from_db(logging_key, process.env.TABLE_PRODUCT, inputData);
    console.log(`${logging_key} - Product Detail - ${JSON.stringify(PRODUCT)}`);
    res.data = PRODUCT || {};
    next();
  } catch (err) {
    next(err);
  }
};
