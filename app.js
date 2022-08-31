const { PORT = 3000 } = process.env;
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/not-found-err');
const { notFoundErr } = require('./utils/errorMessages');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const { NODE_ENV, MONGO_URL } = process.env;

const app = express();
app.use(helmet());
app.use(limiter);

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

require('./routes/index')(app);

app.use((req, res, next) => {
  next(new NotFoundError(notFoundErr));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
