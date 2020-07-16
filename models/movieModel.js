const Sequelize = require('sequelize');

const sequelize2 = require('../connections/database2');

const movieSchema = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING, 
        allowNull: false,
        required: true
    }
};

const Movie = sequelize2.define('Movie', movieSchema);

sequelize2.sync()
.then(result =>{
    console.log('Movie table created');
}).catch(err =>{
    console.log(err);
});

module.exports.Movie = Movie;