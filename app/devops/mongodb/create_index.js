import { create_indexes } from '../../../shared/mongodb.js';
import { userIndex, productIndex } from './index_rules.js';

const logging_key = 'create indexes';

export async function create_index (req, res, next) {
  console.log(`${logging_key} - started`);
  try {
    const COLLECTION_INDEXES = [
      {
        name: process.env.TABLE_USER,
        index: userIndex
      },
      {
        name: process.env.TABLE_PRODUCT,
        index: productIndex
      }
    ];
    console.log(`${logging_key} - COLLECTION_INDEXES - ${JSON.stringify(COLLECTION_INDEXES)}`);
    await create_indexes(logging_key, COLLECTION_INDEXES);
    next();
  } catch (err) {
    next(err);
  }
};
