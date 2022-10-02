const { validateLogin, validateCreateUser } = require('../middlewares/validations');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const NotFoundError = require('../errors/not-found-err');
const { notFoundErr } = require('../utils/errorMessages');

module.exports = (app) => {
  app.post('/signin', validateLogin, login);
  app.post('/signup', validateCreateUser, createUser);

  app.use('/users', usersRoutes);
  app.use('/movies', moviesRoutes);

  app.use(auth);
  app.use('*', (req, res, next) => {
    next(new NotFoundError(notFoundErr));
  });
};
