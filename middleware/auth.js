const {client} = require('../connections/redis-connection');
const log4js = require('log4js');
const logger = log4js.getLogger();

function auth(req, res, next){
    var email = req.header('email');
    
    client.get(email, function(err, value){
        if(err){
            logger.error(err);
            throw err;
        }else{
            console.log(value);
            if(value == null){
                logger.error('email: ' + email + ' - You have been logged out')
                res.send('You have been logged out');
                return;
            }else{
                next();
            }
        }
    });
}

module.exports = auth;