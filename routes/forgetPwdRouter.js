const forgetPwdController = require('../controllers/forgetPwdController');
const express = require('express');
const router = express.Router();


router.post('/sendOTP', forgetPwdController.sendOTP);

router.put('/updatePassword', forgetPwdController.updatePassword);

module.exports = router;