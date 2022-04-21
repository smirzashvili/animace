const express = require('express');
const mangasRouter = express.Router();

const {
    getMangas, 
    getManga
} = require('../controllers/mangas');


mangasRouter.get('/', getMangas);
mangasRouter.get('/:name', getManga);

module.exports = mangasRouter;