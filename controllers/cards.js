const { NotFoundError, ForbiddenError } = require('../errors');
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findOne({ _id: cardId })
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Попытка удалить чужую карточку');
      }

      Card.deleteOne({ _id: cardId })
        .then((deletedCard) => {
          if (deletedCard) {
            res.status(200).send(card);
          } else {
            throw new NotFoundError('Карточка не найдена');
          }
        });
    })
    .catch(next);
};

const putCardLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch(next);
};

const removeCardLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  removeCardLike,
};
