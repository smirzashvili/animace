const express = require('express');
const staffRouter = express.Router();

const {
    getStaff
} = require('../controllers/staff');


staffRouter.get('/:name', getStaff);

module.exports = staffRouter;