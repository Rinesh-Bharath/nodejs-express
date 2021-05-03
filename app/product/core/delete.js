import { remove_one_from_db } from '../../../shared/mongodb.js';
import { deleteSchema } from './joi_schema.js';
import { validate_product_id_exists } from './validate.js';

const logging_key = 'delete a product';

export async function remove (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.body)}`);
  try {
    const inputData = await deleteSchema.validateAsync(req.body);
    const PRODUCT = await validate_product_id_exists(logging_key, inputData.product_id);
    await remove_one_from_db(logging_key, process.env.TABLE_PRODUCT, inputData);
    console.log(`${logging_key} - Product Deleted - ${JSON.stringify(PRODUCT)}`);
    res.data = PRODUCT || {};
    next();
  } catch (err) {
    next(err);
  }
};
