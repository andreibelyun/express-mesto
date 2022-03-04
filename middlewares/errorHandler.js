const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'На сервере произошла ошибка';

  res.status(statusCode).send({ message: errorMessage });

  next();
};

module.exports = errorHandler;
