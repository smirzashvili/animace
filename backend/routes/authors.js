const express = require('express');
const authorsRouter = express.Router();

const {
    getAuthor, 
} = require('../controllers/authors');


authorsRouter.get('/:name', getAuthor);

module.exports = authorsRouter;