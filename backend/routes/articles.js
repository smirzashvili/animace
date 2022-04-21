const express = require('express');
const articlesRouter = express.Router();

const {
    getArticles, 
    createArticle, 
    getArticle,
    getArticlesByAuthor
} = require('../controllers/articles');


articlesRouter.get('/', getArticles);
articlesRouter.get('/:name', getArticle);
articlesRouter.get('/get-info-by-author', getArticlesByAuthor);

articlesRouter.post('/create', createArticle);

module.exports = articlesRouter;