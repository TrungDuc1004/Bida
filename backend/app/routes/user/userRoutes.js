const express = require('express');
const router = express.Router();
const verifyToken = require('../../../middlewares/verifyToken');
const userController = require('../../controllers/user/userController');

router.post('/login', userController.loginUser); // post[/user/login]
router.post('/register', userController.registerUser); // post[/user/register]
router.put('/profile', verifyToken, userController.profileUser); // put[/user/profile]
router.get('/profile', verifyToken, userController.getProfileUser); // get[/user/profile]

module.exports = router;