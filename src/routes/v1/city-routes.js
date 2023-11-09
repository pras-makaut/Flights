const express = require('express');
const {CityController} = require('../../controllers')
const router = express.Router();
const {CityMiddleware} = require('../../middleware');

// api/v1/cities POST
router.post('/',CityMiddleware.validateCreateRequest,CityController.createCity);

// api/v1/cities/:id
router.delete('/:id',CityController.deleteCityById);

// api/v1/cities

router.patch('/',CityController.updateCity);

module.exports = router;