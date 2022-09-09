const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getInfo, updateUserInfo,
} = require('../controllers/users');
const { validateUpdateUserInfo } = require('../middlewares/validations');

router.use(auth);
router.get('/me', getInfo);
router.patch('/me', validateUpdateUserInfo, updateUserInfo);

module.exports = router;
