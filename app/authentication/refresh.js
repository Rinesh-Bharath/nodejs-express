import pkg from 'jsonwebtoken';
const jwt = pkg;

const logging_key = 'refresh access token';

export function refresh (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.headers)}`);
  try {
    if (!req.headers.authorization) {
      throw new Error('Authorization required in Headers');
    }

    const authorizationHeader = req.headers.authorization;
    const authorizationToken = authorizationHeader.split(' ');
    const [ type, token ] = authorizationToken;

    if (type !== process.env.JWT_REFRESH_TYPE) {
      throw new Error('Invalid Authorization Token type');
    }
    const { user_id, display_name, email } = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    res.data = { user_id, display_name, email };
    next();
  } catch (err) {
    next(err);
  }
}
