import { create_a_collection } from '../../../shared/mongodb.js';
import { userValidationRule, productValidationRule } from './validation_rules.js';

const logging_key = 'create a collection';

export async function create_collection (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.body)}`);
  try {
    await create_a_collection(logging_key, process.env.TABLE_USER, userValidationRule);
    await create_a_collection(logging_key, process.env.TABLE_PRODUCT, productValidationRule);
    next();
  } catch (err) {
    next(err);
  }
};
