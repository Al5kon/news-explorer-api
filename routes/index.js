const router = require('express').Router();

const routerCards = require('./cards');
const routerUsers = require('./users');

router.use('/cards', routerCards);
router.use('/users', routerUsers);

module.exports = router;
