const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

module.exports = (app) => {
  app.post('/signin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().min(3).required().email(),
      password: Joi.string().required(),
    }),
  }), login);

  app.post('/signup', celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().min(3).required().email(),
      password: Joi.string().required(),
    }),
  }), createUser);
  app.use('/users', auth, usersRoutes);
  app.use('/movies', auth, moviesRoutes);
};
