const express = require('express');
const { validateCardData } = require('../middlewares/validations');
const {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  removeCardLike,
} = require('../controllers/cards');

const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);
cardsRoutes.post('/', validateCardData, createCard);
cardsRoutes.delete('/:cardId', deleteCard);
cardsRoutes.put('/:cardId/likes', putCardLike);
cardsRoutes.delete('/:cardId/likes', removeCardLike);

exports.cardsRoutes = cardsRoutes;
