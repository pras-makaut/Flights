const express = require('express');
const {AirplaneController} = require('../../controllers')
const {AirplaneMiddleware} = require('../../middleware');
const router = express.Router();
// api/v1/airplanes POST
router.post('/',AirplaneMiddleware.validateCreateRequest,AirplaneController.createAirplane);
// api/v1/airplanes GET
router.get('/',AirplaneController.getAllAirplanes);

// api/v1/airplanes/:id

router.get('/:id',AirplaneController.getAirplaneById);

module.exports = router;