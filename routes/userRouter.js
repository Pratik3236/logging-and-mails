const usersController = require('../controllers/usersController');
const auth = require('../middleware/auth')


const express = require('express');
const router = express.Router();

router.post('/registration', usersController.registration);

router.post('/login', usersController.login);

router.post('/change-password', auth, usersController.changePassword);

router.post('/logout', auth, usersController.logout);

module.exports = router;