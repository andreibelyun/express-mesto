const jwt = require('jsonwebtoken');
const { UnauthorizatedError } = require('../errors');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  let payload;

  if (!token) {
    next(new UnauthorizatedError('Необходима авторизация'));
    return;
  }

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new UnauthorizatedError('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};
