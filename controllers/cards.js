const Card = require('../models/card');
const {
  BadRequestError,
  NotYoursError,
  NotFoundError,
} = require('../middlewares/error');
require('./users');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const postCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => { throw new BadRequestError('Неверный запрос'); })
    .catch(next);
};

const deleteCardByCardId = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      if (req.user._id === card.owner.toString()) {
        Card.findByIdAndRemove(cardId)
          .then(() => {
            res.send({ data: card });
          })
          .catch(next);
      } else {
        throw new NotYoursError('Это карта Вам не принадлежит');
      }
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  postCard,
  deleteCardByCardId,
};
