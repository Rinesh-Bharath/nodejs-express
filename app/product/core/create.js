import { v4 as uuid } from 'uuid';
import { insert_into_db } from '../../../shared/mongodb.js';
import { createSchema } from './joi_schema.js';

const logging_key = 'create a product';

export async function create (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.body)}`);
  try {
    const inputData = await createSchema.validateAsync(req.body);

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
    const PRODUCT = await insert_into_db(logging_key, process.env.TABLE_PRODUCT, productData);
    console.log(`${logging_key} - Product Detail - ${JSON.stringify(PRODUCT)}`);
    res.data = PRODUCT;
    next();
  } catch (err) {
    next(err);
  }
};
