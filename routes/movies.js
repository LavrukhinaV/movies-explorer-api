const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getMovies, createMovies, deleteMovies,
} = require('../controllers/movies');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validations');

router.use(auth);
router.get('', getMovies);
router.post('', validateCreateMovie, createMovies);
router.delete('/:movieId', validateDeleteMovie, deleteMovies);

module.exports = router;
