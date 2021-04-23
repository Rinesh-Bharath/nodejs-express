import { fetch_one_from_db } from '../../../shared/mongodb.js';
import pkg from 'joi';
const Joi = pkg;

const logging_key = 'read a user';

const schema = Joi.object({
  display_name: Joi.string().alphanum(),
  age: Joi.number()
});

export async function read (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.query)}`);
  try {
    const DATA = await schema.validateAsync(req.query);
    const USER = await fetch_one_from_db(logging_key, process.env.TABLE_USER, DATA);
    console.log(`${logging_key} - User Detail - ${JSON.stringify(USER)}`);
    res.data = USER || {};
    next();
  } catch (err) {
    next(err);
  }
};
