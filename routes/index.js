const router = require('express').Router();
const ErrorMessage = require('../errors/errormessage');

const routerArticles = require('./articles');
const routerUsers = require('./users');
const { Error404 } = require('../errors/error');

router.use('/articles', routerArticles);
router.use('/users', routerUsers);
router.use((req, res, next) => {
  const err = new Error404(ErrorMessage.RESOURCE_NOT_FOUND);
  return next(err);
});

module.exports = router;
