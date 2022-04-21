const express = require('express');
const seriesRouter = express.Router();

const {
    getSeries, 
    getSerie
} = require('../controllers/series');


seriesRouter.get('/', getSeries);
seriesRouter.get('/:name', getSerie);

module.exports = seriesRouter;