const {User} = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {client} = require('../connections/redis-connection');
const log4js = require('log4js');
const logger = log4js.getLogger();
 
exports.registration = async(req, res)=>{
    let user = await User.findOne({where: {email: req.body.email}});

    try{
        logger.info('Register API, email: ' + req.body.email + ', name: ' + req.body.name)
        if(user){
            logger.error('User already exists')
            res.status(400).send('User already exists');
            return;
        }
    
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
    

        user = User.create({
            name: req.body.name,
            email: req.body.email,  
            password: password
        }).then((user) => {
            res.send(user);
            logger.info(user);
        });
    }catch(err){
        logger.error(err);
    }
    

}

exports.login =  async(req, res)=>{
    const user = await User.findOne({where: {email: req.body.email}});
    try{
        logger.info('Login API, email: ' + req.body.email)
        if(!user){
            logger.error('login unsuccessful invalid email or password')
            res.status(400).send('Invalid email or password');
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            logger.error('login unsuccessful invalid email or password')
            res.status(400).send('Invalid email or password');
            return;
        }

        logger.info('Login API = login successful, email: ' + user.email)

        const accesstoken = jwt.sign({id:user.id}, config.get('jwtPrivateKey'), {expiresIn: '15m'});

        client.set(user.email, accesstoken, function(err){
            if(err){
                logger.error(err)
                throw err;
            }else{
                client.get(user.email, function(err, value){
                    if(err){
                        logger.error(err)
                        throw err;
                    }else{
                        console.log(value);
                    }
                });
            }
        });
        logger.info('login API = response, ' + 'email: ' + user.email + ', token: ' + accesstoken)  
        res.send(accesstoken);
    }catch(err){
        logger.error(err);
    }
}

exports.changePassword = async(req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        logger.info('Change-password API, email: ' + req.body.email)

        if(req.body.password === ""){
            logger.error('Please provide password to be updated')
            res.send('Please provide password to be updated')
            return;
        }else{
            User.update({password: password}, {where: {email: req.body.email}})
            .then(() =>{
                res.send( "password updated successfully");
                logger.info('Change-password API = response, ' + 'email: ' + req.body.email + ' - Password updated successfully')
            }).catch(err => {
                console.log(err);
                logger.error(err);
            }); 
        }

        var email = req.header('email');

        client.del(email, function(err, value){
            if(err){
                throw err;
                logger.error(err);
            }else{
                console.log(value);
            }
        })
        
    }catch(err){
        logger.error(err);
    }
    
}

exports.logout = async(req, res)=>{
    const user = await User.findOne({where: {email: req.body.email}});
    try{
        logger.info('Logout API, email: ' + req.body.email)
        if(!user){
            logger.error('logout unsuccessful invalid email or password')
            res.status(400).send('Invalid email or password');
            return;
        }
    
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            logger.error('logout unsuccessful invalid email or password')
            res.status(400).send('Invalid email or password');
            return;
        }
    
        var email = req.header('email');
    
        client.del(email, function(err, value){
            if(err){
                throw err;
                logger.error(err);
            }else{
                console.log(value);
            }
        })
        logger.info('email: ' + user.email + ' - You have been successfully logged out')
        res.send('Logged out')
    }catch(err){
        logger.error(err);
    }
    
}

