import { loginSchema } from './joi_schema.js';
import { fetch_one_from_db } from '../../../shared/mongodb.js';
import { verify_password } from '../../../shared/helper.js';

const logging_key = 'login a user';

export async function login (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.body)}`);
  try {
    const inputData = await loginSchema.validateAsync(req.body);

    const filter = {
      email: inputData.email
    };
    const project = {
      password: 1,
    };

    const USER = await fetch_one_from_db(logging_key, process.env.TABLE_USER, filter, project);
    if (!USER) {
      throw new Error('Invalid email id');
    }
    if (!await verify_password(inputData.password, USER.password)) {
      throw new Error('Invalid password');
    }

    console.log(`${logging_key} - User Detail - ${JSON.stringify(USER)}`);
    res.data = USER;
    next();
  } catch (err) {
    next(err);
  }
}
