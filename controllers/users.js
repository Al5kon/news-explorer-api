const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NotFoundError, BadRequestError, UnauthorizedError } = require('../middlewares/error');


const getUserById = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
      }
      res.send({ data: user });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({ data: user });
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
      res.cookie('jwt', token, { maxAge: 360000 * 24 * 7, httpOnly: true, sameSite: true }).end();
    })
    .catch(() => { throw new UnauthorizedError('Нет доступа'); })
    .catch(next);
};

const findAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports = {
  getUserById,
  createUser,
  login,
  findAllUsers,
};
