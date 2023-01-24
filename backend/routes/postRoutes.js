const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { getSignedUrl, addPost, fetchUserPosts } = require('../controllers/postsController')

router.route('/getSignedUrl').post(protect, getSignedUrl);
router.route('/add').post(protect, addPost);
router.route('/user').post(protect, fetchUserPosts)

module.exports = router
