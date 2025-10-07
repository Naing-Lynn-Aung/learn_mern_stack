const express = require('express');
const UserController = require('../controllers/UserController');
const { body } = require('express-validator');
const handleErrorMessage = require('../middlewares/handleErrorMessage');
const User = require('../models/User');
const router = express.Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.post('/login', UserController.login);
router.get('/me', AuthMiddleware, UserController.me);
router.post('/register', [
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('email').custom(async value => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error('E-mail already in use');
        }
    }),
    body('password').notEmpty()
], handleErrorMessage, UserController.register);
router.post('/logout', UserController.logout);

module.exports = router;