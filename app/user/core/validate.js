import { fetch_one_from_db } from '../../../shared/mongodb.js';

export async function validate_email_exists (logging_key, emailId) {
  try {
    const filter = {
      'email': emailId
    };
    const USER = await fetch_one_from_db(logging_key, process.env.TABLE_USER, filter);
    if (USER) {
      throw new Error('Email Already Taken');
    }
  } catch (err) {
    throw err;
  }
};

export async function validate_user_id_exists (logging_key, user_id) {
  try {
    const filter = {
      user_id
    };
    const USER = await fetch_one_from_db(logging_key, process.env.TABLE_USER, filter);
    if (!USER) {
      throw new Error('UserID does not exists');
    }
    return USER;
  } catch (err) {
    throw err;
  }
};
