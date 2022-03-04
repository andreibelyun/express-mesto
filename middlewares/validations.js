const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const emailValidator = (email) => validator.isEmail(email);
const linkValidator = (link) => validator.isURL(link);

const linkRegEx = /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

const validateRegisterData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkRegEx),
  }),
});

const validateLoginData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCardData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkRegEx),
  }),
});

const validateUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkRegEx),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

// const validateParam = (paramName) => {
//   celebrate({
//     params: Joi.object().keys({
//       [paramName]: Joi.string().length(24).hex().required(),
//     }),
//   });
// };

module.exports = {
  linkValidator,
  emailValidator,
  validateRegisterData,
  validateLoginData,
  validateCardData,
  validateUserData,
  validateUserAvatar,
  validateUserId,
  validateCardId,
};
