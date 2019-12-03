const routerUsers = require('express').Router();

const { getUserById } = require('../controllers/users');

routerUsers.get('/me', getUserById);

module.exports = routerUsers;
