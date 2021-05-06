import pkg from 'jsonwebtoken';
const jwt = pkg;

const logging_key = 'access_token for a user';

export async function access_token (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(res.data)}`);
  try {
    const data = {
      user_id: res.data.user_id,
      display_name: res.data.display_name,
      email: res.data.email
    };

    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
    const accessToken = {
      expiresIn: process.env.JWT_EXPIRES,
      type: process.env.JWT_TYPE,
      token
    };
    console.log(`${logging_key} - Access Detail - ${JSON.stringify(accessToken)}`);
    res.data.access = accessToken;
    next();
  } catch (err) {
    next(err);
  }
}
