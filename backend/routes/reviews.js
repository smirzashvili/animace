const express = require('express');
const reviewsRouter = express.Router();

const {
    getReviews, 
    getReview,
    // createArticle, 
    // getReviewsByAuthor
} = require('../controllers/reviews');


reviewsRouter.get('/', getReviews);
reviewsRouter.get('/:name', getReview);
// reviewsRouter.post('/create', createArticle);

module.exports = reviewsRouter;