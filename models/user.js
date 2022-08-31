const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-err');
const { dataErr } = require('../utils/errorMessages');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Email невалидный',
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function fn(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(dataErr);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(dataErr);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
