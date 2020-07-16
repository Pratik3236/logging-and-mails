const Sequelize = require('sequelize');

const sequelize1 = require('../connections/database1');

const userSchema = {
    id :{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING, 
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
};

const User = sequelize1.define('User', userSchema);

sequelize1.sync()
.then(result =>{
    console.log('User table created');
}).catch(err =>{
    console.log(err);
});

module.exports.User = User;