const routerArticles = require('express').Router();

const { getAllArticles, postArticle, deleteArticleByArticleId } = require('../controllers/articles');
const { validateArticleInfo, validateArticleGetter } = require('../helpers/celebrate-request-validation');

routerArticles.get('/', getAllArticles);
routerArticles.post('/', validateArticleInfo, postArticle);
routerArticles.delete('/:articleId', validateArticleGetter, deleteArticleByArticleId);

module.exports = routerArticles;
