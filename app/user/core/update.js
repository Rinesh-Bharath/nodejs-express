import { update_into_db } from '../../../shared/mongodb.js';
import { updateSchema } from './joi_schema.js';
import { validate_user_id_exists } from './validate.js';

const logging_key = 'update a user';

export async function update (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.body)}`);
  try {
    const DATA = await updateSchema.validateAsync(req.body);
    await validate_user_id_exists(logging_key, DATA.user_id);

    const updateData = {};

    if (DATA.age) {
      if (DATA.age < 18 || DATA.age > 120) {
        throw new Error('Age should be between 18 and 120');
      }
      updateData.age = DATA.age;
    }

    if (DATA.display_name) {
      updateData.display_name = DATA.display_name;
    }

    const filter = {
      user_id: DATA.user_id
    };
    const update = {
      $set: updateData
    };

    const USER = await update_into_db(logging_key, process.env.TABLE_USER, filter, update);
    console.log(`${logging_key} - User Detail - ${JSON.stringify(USER)}`);
    res.data = USER.value || {};
    next();
  } catch (err) {
    next(err);
  }
};
