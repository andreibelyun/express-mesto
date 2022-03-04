const BadRequestError = require('./BadRequestError');
const UnauthorizatedError = require('./UnauthorizedError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');
const ConflictError = require('./ConflictError');

module.exports = {
  BadRequestError,
  UnauthorizatedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
