const mongoose = require('mongoose');
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
      validator(v) {
        return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._[\]+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_[\]+.~#?&//=]*)/.test(v);
      },
      message: urlNotValid,
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._[\]+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_[\]+.~#?&//=]*)/.test(v);
      },
      message: urlNotValid,
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._[\]+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_[\]+.~#?&//=]*)/.test(v);
      },
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
    type: String,
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
