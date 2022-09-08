const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const ConflictError = require('../errors/conflict-error');
const { validationErr, emailIsUsedErr, userNotFoundErr } = require('../utils/errorMessages');

const { getJwtToken } = require('../utils/auth');

module.exports.getInfo = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundErr);
      }
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user.id, { email, name }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        throw new NotFoundError(userNotFoundErr);
      }
      res.send({
        name: data.name,
        email: data.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(validationErr);
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = getJwtToken(user.id);
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(validationErr));
      } else if (err.code === 11000) {
        next(new ConflictError(emailIsUsedErr));
      } else {
        next(err);
      }
    })
    .catch(next);
};
