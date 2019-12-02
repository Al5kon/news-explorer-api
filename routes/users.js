const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUserById, findAllUsers } = require('../controllers/users');

routerUsers.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24),
  }),
}), getUserById);

routerUsers.get('/', findAllUsers);

module.exports = routerUsers;
