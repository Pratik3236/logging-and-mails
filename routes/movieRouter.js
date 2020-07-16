const {Movie} = require('../models/movieModel');
const auth = require('../middleware/auth');
const moviesController = require('../controllers/moviesController');
const express = require('express');
const router = express.Router();


router.get('/', auth, moviesController.getMovies);

router.post('/', auth, moviesController.postMovies);

router.put('/:id', auth, moviesController.updateMovies);

router.delete('/:id', auth, moviesController.deleteMovies);

module.exports = router;