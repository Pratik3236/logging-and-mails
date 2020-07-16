const Sequelize = require('sequelize');

const sequelize1 = new Sequelize('user_db', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});

sequelize1.authenticate()
  .then(() => {
    console.log('Connected to the mysql user database.');
  })
  .catch(err => {
    console.error('Unable to connect to the mysql user database:', err);
});
 
module.exports = sequelize1;  
