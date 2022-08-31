const Movie = require('../models/movie');
const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const { validationErr, permissionErr, movieNotFoundErr } = require('../utils/errorMessages');

module.exports.getMovies = (req, res, next) => {
  Movie.find({
    owner: req.user.id,
  })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovies = (req, res, next) => {
  Movie.create({
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    owner: req.user.id,
    movieId: req.body.movieId,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
    thumbnail: req.body.thumbnail,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(validationErr);
      }
      next(err);
    })
    .catch(next);
};

module.exports.deleteMovies = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFoundErr);
      } else if (req.user.id !== String(movie.owner)) {
        throw new ForbiddenError(permissionErr);
      }
      return movie;
    })
    .then((movie) => movie.delete())
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError(validationErr);
      }
      next(err);
    })
    .catch(next);
};
