import { v4 as uuid } from 'uuid';
import { insert_many_into_db } from '../../../shared/mongodb.js';
import { createSchema } from './joi_schema.js';

const logging_key = 'create products';

export async function create_many (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.body)}`);
  const PRODUCT_LIST = req.body || [];
  const PRODUCTS = [];
  try {
    console.time('for');
    for (const product of PRODUCT_LIST) {
      const inputData = await createSchema.validateAsync(product);
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
      PRODUCTS.push(productData);
    }
    const productsInserted = await insert_many_into_db(logging_key, process.env.TABLE_PRODUCT, PRODUCTS);
    console.timeEnd('for');
    console.log(`${logging_key} - Products Added - ${JSON.stringify(productsInserted)}`);
    res.data = productsInserted;
    next();
  } catch (err) {
    next(err);
  }
};
