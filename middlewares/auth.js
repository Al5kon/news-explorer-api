const jwt = require('jsonwebtoken');
const ErrorMessage = require('../errors/errormessage');
const { keySecret } = require('../config');
const { Error401 } = require('../errors/error');

module.exports = ((req, res, next) => {
  const { authorization } = req.headers;
  const { NODE_ENV, JWT_SECRET } = process.env;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Error401(ErrorMessage.AUTHORIZATION_REQUIRED));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : keySecret);
  } catch (err) {
    return next(new Error401(ErrorMessage.AUTHORIZATION_REQUIRED));
  }

  req.user = payload;
  return next();
});
