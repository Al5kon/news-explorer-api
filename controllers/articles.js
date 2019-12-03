const Article = require('../models/article');
const User = require('../models/user');
const {
  BadRequestError,
  NotYoursError,
  NotFoundError,
} = require('../middlewares/error');
require('./users');

const getAllArticles = (req, res, next) => {
  const owner = req.user._id;
  User.findById(owner)
    .then(() => {
      Article.find({ owner })
        .then((article) => res.status(200).send({ data: article }))
        .catch(next);
    })
    .catch(next);
};

const postArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then(() => res.status(201).end())
    .catch(() => { throw new BadRequestError('Неверный запрос'); })
    .catch(next);
};

const deleteArticleByArticleId = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Такой  статьи не существует');
      }
      if (req.user._id === article.owner.toString()) {
        Article.findByIdAndRemove(articleId)
          .then(() => {
            res.status(200).end();
          })
          .catch(next);
      } else {
        throw new NotYoursError('Эта статья Вам не принадлежит');
      }
    })
    .catch(next);
};

module.exports = {
  getAllArticles,
  postArticle,
  deleteArticleByArticleId,
};
