const config = require('config')
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user: 'pratikb5652@gmail.com',
        // pass : process.env.PASSWORD
        pass : config.get('password')
    }
});

module.exports.transporter = transporter