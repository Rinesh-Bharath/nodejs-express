import pkg from 'jsonwebtoken';
const jwt = pkg;

const logging_key = 'refresh_token for a user';

export async function refresh_token (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(res.data)}`);
  try {
    const data = {
      user_id: res.data.user_id,
      display_name: res.data.display_name,
      email: res.data.email
    };

    const token = jwt.sign(data, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES });
    const refreshToken = {
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
      type: process.env.JWT_REFRESH_TYPE,
      token
    };
    console.log(`${logging_key} - Access Detail - ${JSON.stringify(refreshToken)}`);
    res.data.refresh = refreshToken;
    next();
  } catch (err) {
    next(err);
  }
}
