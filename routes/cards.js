const express = require('express');
const { validateCardData, validateCardId } = require('../middlewares/validations');
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
cardsRoutes.delete('/:cardId', validateCardId, deleteCard);
cardsRoutes.put('/:cardId/likes', validateCardId, putCardLike);
cardsRoutes.delete('/:cardId/likes', validateCardId, removeCardLike);

exports.cardsRoutes = cardsRoutes;
