const express = require('express');
const {AirportController} = require('../../controllers')

const {AirportMiddleware} = require('../../middleware');

const router = express.Router();
// api/v1/airports POST
router.post('/',AirportMiddleware.validateCreateRequest,AirportController.createAirport);
// api/v1/airports GET
router.get('/',AirportController.getAllAirports);

// api/v1/airports/:id

router.get('/:id',AirportController.getAirportById);

// api/v1/airports/:id

router.delete('/:id',AirportController.deleteAirportById);

// api/v1/airports
router.patch('/',AirportMiddleware.validateUpdateRequest,AirportController.updateAirport);

module.exports = router;