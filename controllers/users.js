const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { keySecret } = require('../config');
const { Error404, Error400, Error401 } = require('../errors/error');
const ErrorMessage = require('../errors/errormessage');

const getUserById = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new Error404(ErrorMessage.USER_NOT_FOUND);
      }
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => {
      res.status(201).end();
    })
    .catch(() => { throw new Error400(ErrorMessage.BAD_REQUEST); })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : keySecret, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 360000 * 24 * 7, httpOnly: true, sameSite: true }).send(token);
    })
    .catch(() => { throw new Error401(ErrorMessage.AUTHORIZATION_REQUIRED); })
    .catch(next);
};

module.exports = {
  getUserById,
  createUser,
  login,
};
