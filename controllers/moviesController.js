const {Movie} = require('../models/movieModel');
const log4js = require('log4js');
const logger = log4js.getLogger();

exports.getMovies = async(req, res)=>{
    const movie = await Movie.findAll();
    try{
        logger.info('GET movies API, email: ' + req.body.email)
        logger.info(movie)
        res.send(movie);
    } catch(err){
        logger.error(err);
    } 
}
    

exports.postMovies = (req, res)=>{
    logger.info('POST movies API, email: ' +  req.body.email + ' name: ' + req.body.name);
    try{
        Movie.create({
            email: req.body.email,    
            name: req.body.name
        }).then(movie =>{
            res.send(movie);
            logger.info(movie)
        })
    }catch(err){
        logger.error(err);
    } 
    
}

exports.updateMovies = (req, res)=>{
    try{
        logger.info('PUT movies API, email: ' +  req.body.email + ' name: ' + req.body.name);
        Movie.update({name: req.body.name}, {where: {id: req.params.id}})
        .then(() =>{
            logger.info('PUT movie API, Name updated successfully')
            res.send( "Name updated successfully");
        }).catch(err => {
            console.log(err);
            logger.error(err);
        });
    }catch(err){
        logger.error(err);
    } 
    
}

exports.deleteMovies = async(req, res)=>{
    let movie = await Movie.findOne({where: {id: req.params.id}});
    logger.info('Delete movies API, id: ' +  req.params.id);
    try{
        if(movie){
           await Movie.destroy({where: {id: req.params.id}});
            logger.info('Deleted movie with id: ' + req.params.id);
            res.send(movie);
            return;
        }else{
            logger.error('Provide valid id')
            res.send('provide valid id')
        }
    } catch(err){
        logger.error(err);
    }       
}