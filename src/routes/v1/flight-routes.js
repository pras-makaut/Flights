const express = require('express');
const {FlightController} = require('../../controllers')

const {FlightMiddlewere} = require('../../middleware');

const router = express.Router();
// api/v1/flights POST
router.post('/',FlightMiddlewere.validateCreateRequest,FlightController.createFlight);

// api/v1/flights?TRIPS=MUM-DELHI GET
router.get('/',FlightController.getAllFlights);


// api/v1/flights/:id

router.get('/:id',FlightController.getFlightById);

// api/v1/flights/:id/seats Patch

router.patch('/:id/seats',FlightMiddlewere.validateUpdateSeatsRequest,FlightController.updateRemainingSeats);

module.exports = router;