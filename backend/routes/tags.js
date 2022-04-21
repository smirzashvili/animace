const express = require('express');
const tagsRouter = express.Router();

const {
    getTags, 
    getTag
} = require('../controllers/tags');


tagsRouter.get('/', getTags);
tagsRouter.get('/:name', getTag);

module.exports = tagsRouter;