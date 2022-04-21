const express = require('express');
const categoriesRouter = express.Router();

const {
    getCategories, 
    getCategory
} = require('../controllers/categories');


categoriesRouter.get('/', getCategories);
categoriesRouter.get('/:name', getCategory);

module.exports = categoriesRouter;