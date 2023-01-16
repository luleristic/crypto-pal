const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, editUser, editUserAvatar} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getUser).put(protect, editUser);
router.route('/me/avatar').post(protect, editUserAvatar);

module.exports = router;