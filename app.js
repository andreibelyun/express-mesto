const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { cardsRoutes } = require('./routes/cards');
const { userRoutes } = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { NotFoundError } = require('./errors');
const { validateRegisterData, validateLoginData } = require('./middlewares/validations');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.post('/signup', validateRegisterData, createUser);

app.post('/signin', validateLoginData, login);

app.use(cookieParser(), auth);

app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);
// если не users и не cards
app.use((req, res, next) => { next(new NotFoundError('Ресурс не найден')); });

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server works on ${PORT} port`);
});
