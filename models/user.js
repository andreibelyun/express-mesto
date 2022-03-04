const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { linkValidator, emailValidator } = require('../middlewares/validations');
const { UnauthorizatedError } = require('../errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: linkValidator,
      message: 'Некорректная ссылка',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: emailValidator,
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        // неправильная почта
        return Promise.reject(new UnauthorizatedError('Неправильная почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // неправильный пароль
            return Promise.reject(new UnauthorizatedError('Неправильная почта или пароль'));
          }
          // возвращаем юзера
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
