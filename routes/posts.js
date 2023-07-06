const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts');
const userController = require('../controllers/users');

router.post('/', userController.auth, postCtrl.createPost);
router.get('/:id', userController.auth, postCtrl.showPost);
router.put('/:id', userController.auth, postCtrl.updatePost);
router.delete('/:id', userController.auth, postCtrl.deletePost);
router.get('/', userController.auth, postCtrl.showAllPosts);
router.put('/:post_id/like', userController.auth, postCtrl.likePost);
router.post('/:post_id/comment', userController.auth, postCtrl.commentOnPost);

module.exports = router;
