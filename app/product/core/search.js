import { aggregate_from_db } from '../../../shared/mongodb.js';
import { searchSchema } from './joi_schema.js';

const logging_key = 'search a product';

export async function search (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.body)}`);
  try {
    const filter = await searchSchema.validateAsync(req.body.filter);
    const { user_id, status, price, color, name, email } = filter || {};
    const sort = req.body.sort || 'PRICE_DESC';
    const skip = req.body.skip ? parseInt(req.body.skip) : 0;
    const limit = req.body.limit ? parseInt(req.body.limit) : 10;

    const aggregateQuery1 = [];

    if (user_id) {
      const userIdMatch = {
        '$match': {
          'audit.created_by': user_id,
        }
      };
      aggregateQuery1.push(userIdMatch);
    }

    if (color) {
      const colorMatch = {
        '$match': {
          color: color,
        }
      };
      aggregateQuery1.push(colorMatch);
    }

    if (name) {
      const nameMatch = {
        '$match': {
          name: name,
        }
      };
      aggregateQuery1.push(nameMatch);
    }

    if (price) {
      const priceMatch = {
        '$match': {
          price: price,
        }
      };
      aggregateQuery1.push(priceMatch);
    }

    if (status) {
      const statusMatch = {
        '$match': {
          status: status,
        }
      };
      aggregateQuery1.push(statusMatch);
    }

    const aggregateQuery2 = [{
      '$lookup': {
        'from': process.env.TABLE_USER,
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
        'from': process.env.TABLE_USER,
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
    }];

    const aggregateQuery = [...aggregateQuery1, ...aggregateQuery2];

    if (email) {
      const nameMatch = {
        '$match': {
          'created_by_user.email': email,
        }
      };
      aggregateQuery.push(nameMatch);
    }

    // Sort stage
    aggregateQuery.push({
      '$sort': findSortStage(sort)
    });

    // Skip stage
    aggregateQuery.push({
      '$skip': skip
    });

    // Limit stage
    aggregateQuery.push({
      '$limit': limit
    });

    const PRODUCTS = await aggregate_from_db(logging_key, process.env.TABLE_PRODUCT, aggregateQuery);
    console.log(`${logging_key} - Products Detail - ${JSON.stringify(PRODUCTS)}`);
    res.data = PRODUCTS || [];
    next();
  } catch (err) {
    next(err);
  }
};

function findSortStage (sortValue = null) {
  try {
    let sort = {};
    switch (sortValue) {
    case 'PRICE_ASC':
      sort = {
        price: 1,
      };
      break;
    case 'PRICE_DESC':
      sort = {
        price: -1,
      };
      break;
    case 'NAME_ASC':
      sort = {
        name: 1,
      };
      break;
    case 'NAME_DESC':
      sort = {
        name: -1,
      };
      break;
    }
    return sort;
  } catch (err) {
    throw new Error(err.message);
  }
}
