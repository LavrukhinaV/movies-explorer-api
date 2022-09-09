const mongoose = require('mongoose');
const validator = require('validator');
const { urlNotValid } = require('../utils/errorMessages');

const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: validator.isURL,
      message: urlNotValid,
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: validator.isURL,
      message: urlNotValid,
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: validator.isURL,
      message: urlNotValid,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('movie', movieSchema);
