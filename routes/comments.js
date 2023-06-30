const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments');
const userController = require('../controllers/users');

router.post('/', userController.auth, commentController.createComment);

module.exports = router;
