const router = require('express').Router();
const {
  getMovies, createMovies, deleteMovies,
} = require('../controllers/movies');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validations');

router.get('', getMovies);
router.post('', validateCreateMovie, createMovies);
router.delete('/:movieId', validateDeleteMovie, deleteMovies);

module.exports = router;
