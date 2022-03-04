const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'На сервере произошла ошибка';

  // ошибки, которые мы не выбрасывали
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Переданы некорректные данные при создании объекта' });
    return;
  }
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Передан некорректный id' });
    return;
  }
  if (err.name === 'DocumentNotFoundError') {
    res.status(404).send({ message: 'Объект не найден' });
    return;
  }
  // попытка регистрации по существующему email
  if (err.name === 'MongoError' && err.code === 11000) {
    res.status(409).send({ message: 'Email занят' });
  }

  // ошибки, которые выбросили мы (и ошибка сервера)
  res.status(statusCode).send({ message: errorMessage });

  next();
};

module.exports = errorHandler;
