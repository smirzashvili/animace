const express = require('express');
const actorsRouter = express.Router();

const {
    getActors, 
    createActor, 
    getActor
} = require('../controllers/actors');


actorsRouter.get('/', getActors);
actorsRouter.get('/:name', getActor);
actorsRouter.post('/create', createActor);

module.exports = actorsRouter;