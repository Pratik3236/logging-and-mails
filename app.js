const express = require('express');
const sequelize1 = require('./connections/database1');
const sequelize2 = require('./connections/database2');
const {client} = require('./connections/redis-connection');
const config = require('config');
const movies = require('./routes/movieRouter');
const users = require('./routes/userRouter');
const forgetPwd = require('./routes/forgetPwdRouter');
const app = express();

const log4js = require('log4js');

const logger = log4js.getLogger();

log4js.configure({
    appenders: { fileAppender: {type: 'file', filename: './logs/loggin.log'}, console: {type: 'console'}},
    categories: {default: {appenders: ['fileAppender', 'console'], level: 'info'}}
})

if(!config.get('jwtPrivateKey')){
    console.error('jwtPrivateKey is not defined');
    process.exit(1);
}

if(!config.get('password')){
    console.error('password is not defined');
    process.exit(1);
}


app.use(express.json());
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/users', forgetPwd);

app.listen(3000);