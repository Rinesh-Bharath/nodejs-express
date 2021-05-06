import pkg from 'jsonwebtoken';
const jwt = pkg;

const logging_key = 'verify access token';

export function verify_token (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(res.data)}`);
  try {
    // const data = {
    //   user_id: res.data.user_id,
    //   display_name: res.data.display_name,
    //   email: res.data.email
    // };
    // const token = jwt.verify(data);
    // data.access = token;
    // console.log(`${logging_key} - User Detail - ${JSON.stringify(token)}`);
    // res.data = data;
    next();
  } catch (err) {
    next(err);
  }
}
