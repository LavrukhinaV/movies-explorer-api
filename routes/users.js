const router = require('express').Router();
const {
  getInfo, updateUserInfo,
} = require('../controllers/users');
const { validateUpdateUserInfo } = require('../middlewares/validations');

router.get('/me', getInfo);
router.patch('/me', validateUpdateUserInfo, updateUserInfo);

module.exports = router;
