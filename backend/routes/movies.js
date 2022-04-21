const express = require('express');
const moviesRouter = express.Router();

const {
    getMovies, 
    getMovie
} = require('../controllers/movies');


moviesRouter.get('/', getMovies);
moviesRouter.get('/:name', getMovie);

module.exports = moviesRouter;