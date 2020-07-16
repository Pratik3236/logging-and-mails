const Sequelize = require('sequelize');

const sequelize1 = require('../connections/database1');

const forgetSchema = {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    code:{
        type: Sequelize.STRING
    },
};

const Forget = sequelize1.define('Forget', forgetSchema);

sequelize1.sync()
.then(result =>{
    console.log('forget table created');
}).catch(err =>{
    console.log(err);
});

module.exports.Forget = Forget;