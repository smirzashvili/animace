const express = require('express');
const genresRouter = express.Router();

const {
    getGenres, 
    getGenre
} = require('../controllers/genres');


genresRouter.get('/', getGenres);
genresRouter.get('/:name', getGenre);

module.exports = genresRouter;