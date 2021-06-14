import pkg from 'lodash';
import { v4 as uuid } from 'uuid';
import { insert_into_db } from '../../../shared/mongodb.js';
import { createSchema } from './joi_schema.js';

const { isEmpty } = pkg;

const logging_key = 'create products';

export async function create_promise (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.body)}`);
  const PRODUCT_LIST = req.body || [];
  try {
    if (isEmpty(PRODUCT_LIST)) {
      throw new Error('PRODUCT_LIST cannot be empty');
    }
    console.time('promise');
    const PRODUCTS = await Promise.all(PRODUCT_LIST.map(
      async (product) => process_product(logging_key, product)
    ));
    console.timeEnd('promise');
    console.log(`${logging_key} - Products Added - ${JSON.stringify(PRODUCTS)}`);
    res.data = PRODUCTS;
    next();
  } catch (err) {
    next(err);
  }
};

async function process_product (logging_key, product = {}) {
  try {
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
    const productInserted = await insert_into_db(logging_key, process.env.TABLE_PRODUCT, productData);
    return productInserted;
  } catch (error) {
    throw error;
  }
}
