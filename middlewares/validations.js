const { celebrate, Joi } = require('celebrate');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(3).required().email(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._[\]+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_[\]+.~#?&//=]*)/).required(),
    trailerLink: Joi.string().pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._[\]+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_[\]+.~#?&//=]*)/).required(),
    thumbnail: Joi.string().pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._[\]+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_[\]+.~#?&//=]*)/).required(),
    owner: Joi.string().pattern(/[0-9a-fA-F]{24}$/),
    movieId: Joi.string().pattern(/[0-9a-fA-F]{24}$/),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().pattern(/[0-9a-fA-F]{24}$/),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateUserInfo,
  validateCreateMovie,
  validateDeleteMovie,
};
