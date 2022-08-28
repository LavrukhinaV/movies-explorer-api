const router = require('express').Router();
const {
  getInfo, updateUserInfo,
} = require('../controllers/users');

router.get('/me', getInfo);
router.patch('/me', updateUserInfo);

module.exports = router;
