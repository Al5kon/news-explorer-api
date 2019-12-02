const routerCards = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { getAllCards, postCard, deleteCardByCardId } = require('../controllers/cards');

routerCards.get('/', getAllCards);
routerCards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().uri().max(50).required(),
  }),
}), postCard);
routerCards.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCardByCardId);

module.exports = routerCards;
