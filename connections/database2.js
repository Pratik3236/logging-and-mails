const Sequelize = require('sequelize');

const sequelize2 = new Sequelize('movie_db', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});

sequelize2.authenticate()
  .then(() => {
    console.log('Connected to the mysql movie database.');
  })
  .catch(err => {
    console.error('Unable to connect to the mysql movie database:', err);
  });
 
module.exports = sequelize2;  