const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { getSignedUrl, addPost } = require('../controllers/postsController')

router.route('/getSignedUrl').post(protect, getSignedUrl);
router.route('/add').post(protect, addPost);

module.exports = router
