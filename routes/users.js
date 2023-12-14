const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// router.post('/', userController.createUser);
router.get('/current', userController.getCurrentUser);
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.auth, userController.logoutUser);
router.put('/:id', userController.auth, userController.updateUser);
router.delete('/:id', userController.auth, userController.deleteUser);

module.exports = router;
