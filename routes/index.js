const router = require('express').Router();

const routerArticles = require('./articles');
const routerUsers = require('./users');
const { NotFoundError } = require('../middlewares/error');

router.use('/articles', routerArticles);
router.use('/users', routerUsers);
router.use((req, res, next) => {
  const err = new NotFoundError('Этот ресурс не найден');
  return next(err);
});

module.exports = router;
