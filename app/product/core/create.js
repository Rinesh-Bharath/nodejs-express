import { v4 as uuid } from 'uuid';
import { insert_into_db } from '../../../shared/mongodb.js';
import { createSchema } from './joi_schema.js';

const logging_key = 'create products';

export async function create (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.body)}`);
  const PRODUCT_LIST = req.body || [];
  const PRODUCTS = [];
  try {
    console.time('for');

    // Prevents DoS.
    if (!(PRODUCT_LIST instanceof Array)) {
      return [];
    }

    for (let i = 0; i < PRODUCT_LIST.length; i++) {
      const productToValidate = PRODUCT_LIST[i];
      const inputData = await createSchema.validateAsync(productToValidate);

      const productData = {
        product_id: uuid()
      };

      // default status: 'INACTIVE'
      productData.status = 'INACTIVE';
      productData.name = inputData.name;
      productData.price = inputData.price || 'NA';
      productData.color = inputData.color || 'NA';
      productData.audit = {
        created_by: inputData.user_id || null,
        created_at: new Date().toISOString(),
        updated_by: inputData.user_id || null,
        updated_at: new Date().toISOString(),
      };
      const productInserted = await insert_into_db(logging_key, process.env.TABLE_PRODUCT, productData);
      PRODUCTS.push(productInserted);
    }
    console.timeEnd('for');
    console.log(`${logging_key} - Products Added - ${JSON.stringify(PRODUCTS)}`);
    res.data = PRODUCTS;
    next();
  } catch (err) {
    next(err);
  }
};
