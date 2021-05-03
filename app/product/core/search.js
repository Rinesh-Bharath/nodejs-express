import { aggregate_from_db } from '../../../shared/mongodb.js';
import { searchSchema } from './joi_schema.js';

const logging_key = 'search a product';

export async function search (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.body)}`);
  try {
    const filter = req.body.filter || {};
    const sort = req.query.sort || 'PRICE_DESC';
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;

    const inputData = await searchSchema.validateAsync(filter);

    const aggregateQuery = [{
      '$lookup': {
        'from': 'user_development',
        'localField': 'audit.created_by',
        'foreignField': 'user_id',
        'as': 'created_by_user'
      }
    }, {
      '$unwind': {
        'path': '$created_by_user',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'user_development',
        'localField': 'audit.updated_by',
        'foreignField': 'user_id',
        'as': 'updated_by_user'
      }
    }, {
      '$unwind': {
        'path': '$updated_by_user',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$project': {
        'product_id': 1,
        'name': 1,
        'status': 1,
        'price': 1,
        'color': 1,
        'audit': 1,
        'created_by_user': {
          'user_id': 1,
          'display_name': 1,
          'email': 1
        },
        'updated_by_user': {
          'user_id': 1,
          'display_name': 1,
          'email': 1
        }
      }
    }, {
      '$sort': {
        'price': 1
      }
    }, {
      '$skip': skip
    }, {
      '$limit': limit
    }];
    const PRODUCTS = await aggregate_from_db(logging_key, process.env.TABLE_PRODUCT, aggregateQuery);
    console.log(`${logging_key} - Products Detail - ${JSON.stringify(PRODUCTS)}`);
    res.data = PRODUCTS || [];
    next();
  } catch (err) {
    next(err);
  }
};
