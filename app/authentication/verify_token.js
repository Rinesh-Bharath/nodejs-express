import pkg from 'jsonwebtoken';
const jwt = pkg;

const logging_key = 'verify access token';

export function verify_token (req, res, next) {
  console.log(`${logging_key} - started - ${JSON.stringify(req.headers)}`);
  try {
    if (!req.headers.authorization) {
      throw new Error('Authorization required in Headers');
    }

    const authorizationHeader = req.headers.authorization;
    const authorizationToken = authorizationHeader.split(' ');
    const [ type, token ] = authorizationToken;

    if (type !== process.env.JWT_TYPE) {
      throw new Error('Invalid Authorization Token type');
    }
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    next(err);
  }
}
