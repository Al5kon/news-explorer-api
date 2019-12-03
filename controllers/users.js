const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NotFoundError, BadRequestError, UnauthorizedError } = require('../middlewares/error');


const getUserById = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
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
    .catch(() => { throw new BadRequestError('Ошибка запроса'); })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 360000 * 24 * 7, httpOnly: true, sameSite: true }).send(token);
    })
    .catch(() => { throw new UnauthorizedError('Нет доступа'); })
    .catch(next);
};

module.exports = {
  getUserById,
  createUser,
  login,
};
