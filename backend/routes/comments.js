const express = require('express');
const commentsRouter = express.Router();

const {
    getComments, 
    getComment,
    addComment
} = require('../controllers/comments');


commentsRouter.get('/', getComments);
commentsRouter.get('/:name', getComment);
commentsRouter.post('/add', addComment);

module.exports = commentsRouter;