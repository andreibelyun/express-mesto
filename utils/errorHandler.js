exports.handleError = (err, res) => {
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
  res.status(500).send({ message: 'Произошла ошибка' });
};
