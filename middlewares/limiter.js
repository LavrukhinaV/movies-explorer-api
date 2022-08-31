const rateLimit = require('express-rate-limit');
const { limiterErr } = require('../utils/errorMessages');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  message: limiterErr,
  headers: true,
});

module.exports = limiter;
