import { fetch_one_from_db } from '../../../shared/mongodb.js';

export async function validate_product_id_exists (logging_key, product_id) {
  try {
    const filter = {
      product_id
    };
    const PRODUCT = await fetch_one_from_db(logging_key, process.env.TABLE_PRODUCT, filter);
    if (!PRODUCT) {
      throw new Error('ProductID does not exists');
    }
    return PRODUCT;
  } catch (err) {
    throw err;
  }
};
