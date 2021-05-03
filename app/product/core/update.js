import { update_into_db } from '../../../shared/mongodb.js';
import { updateSchema } from './joi_schema.js';
import { validate_product_id_exists } from './validate.js';

const logging_key = 'update a product';

export async function update (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.body)}`);
  try {
    const DATA = await updateSchema.validateAsync(req.body);
    await validate_product_id_exists(logging_key, DATA.product_id);

    const updateData = {};

    if (DATA.name) {
      updateData.name = DATA.name;
    }

    if (DATA.color) {
      updateData.color = DATA.color;
    }

    if (DATA.price) {
      updateData.price = DATA.price;
    }

    const filter = {
      product_id: DATA.product_id
    };
    const update = {
      $set: updateData
    };

    const PRODUCT = await update_into_db(logging_key, process.env.TABLE_PRODUCT, filter, update);
    console.log(`${logging_key} - Product Detail - ${JSON.stringify(PRODUCT)}`);
    res.data = PRODUCT.value || {};
    next();
  } catch (err) {
    next(err);
  }
};
