const express = require('express');
const {CityController} = require('../../controllers')
const router = express.Router();
const {CityMiddleware} = require('../../middleware');

// api/v1/cities POST
router.post('/',CityMiddleware.validateCreateRequest,CityController.createCity);

module.exports = router;