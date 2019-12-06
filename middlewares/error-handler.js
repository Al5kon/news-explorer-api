const ErrorMessage = require('../errors/errormessage');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? ErrorMessage.SERVER_ERROR : message,
    });
  next();
};
