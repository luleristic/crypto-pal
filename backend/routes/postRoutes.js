const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { getSignedUrl } = require('../controllers/postsController')


router.route('/getSignedUrl').post(protect, getSignedUrl);

module.exports = router
