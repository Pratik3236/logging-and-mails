const {User} = require('../models/userModel');
const {Forget} = require('../models/forgetPwdModel');
const randomize = require('randomatic');
const {transporter} = require('../connections/nodemailer');
const bcrypt = require('bcrypt');
const log4js = require('log4js');
const logger = log4js.getLogger();

exports.sendOTP = async(req, res)=>{
    let user = await User.findOne({where: {email: req.body.email}});
    try{
        logger.info('SendOTP API, email: ' + req.body.email);
        if(!user){
            logger.error('User does not exist');
            res.status(400).send('User does not exist');
            return;
        }
    
        var code = randomize('0', 6);
    
        Forget.create({
            email: req.body.email,
            code: code
        });
    
        Forget.update({code: code}, {where: {email: req.body.email}})
        .then(()=>{
            logger.info('OTP has been sent to your email: ' + req.body.email);
            res.send('OTP has been sent to your email');
        }).catch(err =>{
            logger.error(err);
            console.log(err);   
        });
    
        let mailOptions = {
            to: req.body.email,
            subject: 'OTP for updating password',
            text: `hello, ${code} this is your otp to change the password`
        };
    
        transporter.sendMail(mailOptions, function(err, data){
            if(err){
                logger.error(err);
                console.log(err);
            } else {
                logger.info('SendOTP API = response, ' + 'OTP successfully sent to email: ' + req.body.email);
                console.log('email sent!!')
            }
        });
    }catch(err){
        logger.error(err);
    }
    
}

exports.updatePassword =  async(req, res)=>{
    let user = await User.findOne({where: {email: req.body.email}});
    try{
        logger.info('updatePassword API, email: ' + req.body.email);
        if(!user){
            logger.error('User does not exists')
            res.status(400).send('User does not exists');
            return;
        }
    
        let code = await Forget.findOne({where: {code: req.body.code}});
    
        if(!code){
            logger.error('incorrect OTP');
            res.status(400).send('incorrect OTP');
            return;
        }
    
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
    
        if(req.body.password === ""){
            logger.error('Please provide password to be updated')
            res.send('Please provide password to be updated')
        }else{
            User.update({password: password}, {where: {email: req.body.email}})
            .then(() =>{
                res.send( "password updated successfully");
                logger.info('updatePassword API = response, ' + 'email: ' + req.body.email + ' - Password updated successfully')
            }).catch(err => {
                console.log(err);
            }); 
        }
    }catch(err){
        logger.error(err);
    }
    
}