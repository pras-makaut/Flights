const express = require('express');
const {FlightController} = require('../../controllers')

const {FlightMiddlewere} = require('../../middleware');

const router = express.Router();
// api/v1/flights POST
router.post('/',FlightMiddlewere.validateCreateRequest,FlightController.createFlight);

module.exports = router;