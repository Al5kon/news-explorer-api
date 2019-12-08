const Article = require('../models/article');
const User = require('../models/user');
const {
  Error400,
  Error403,
  Error404,
} = require('../errors/error');
const ErrorMessage = require('../errors/errormessage');
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
    .catch(() => { throw new Error400(ErrorMessage.BAD_REQUEST); })
    .catch(next);
};

const deleteArticleByArticleId = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new Error404(ErrorMessage.NOT_FOUND_ARTICLE);
      }
      if (req.user._id === article.owner.toString()) {
        Article.findByIdAndRemove(articleId)
          .then(() => {
            res.status(200).end();
          })
          .catch(next);
      } else {
        throw new Error403(ErrorMessage.NOT_YOURS_ARTICLE);
      }
    })
    .catch(next);
};

module.exports = {
  getAllArticles,
  postArticle,
  deleteArticleByArticleId,
};
