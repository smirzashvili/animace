const express = require('express');
const filtersRouter = express.Router();

const {
    search,
    filterPosts,
    filterMedia,
    filterRelatedMedia,
    filterRelatedPosts
} = require('../controllers/filters');


filtersRouter.get('/', search);
filtersRouter.post('/filter-posts', filterPosts);
filtersRouter.post('/filter-media', filterMedia);
filtersRouter.post('/filter-related-posts', filterRelatedPosts);
filtersRouter.post('/filter-related-media', filterRelatedMedia);


module.exports = filtersRouter;