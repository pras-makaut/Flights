const {StatusCodes} = require('http-status-codes')
const {FlightService} = require('../services');
const {ErrorResponse ,SuccessResponse} = require('../utils/common');
/**
 * POST : /flights 
 * req-body {
 *  flightNumber: 'UK 808',
 *  airplaneId: 'a380',
 *  departureAirportId: 12,
 *  arrivalAirportId: 11,
 *  arrivalTime: '11:10:00',
 *  departureTime: '9:10:00',
 *  price: 2000
 *  boardingGate: '12A',
 *  totalSeats: 120
 * }
 */
async function createFlight(req,res){
    try {
        const flight = await FlightService.createFlight({
            flighNumber:req.body.flighNumber,
            airplaneId:req.body.airplaneId,
            departureAirportId:req.body.departureAirportId,
            arrivalAirportId:req.body.arrivalAirportId,
            arrivalTime:req.body.arrivalTime,
            departureTime:req.body.departureTime,
            price:req.body.price,
            boardingGate:req.body.boardingGate,
            totalSeats:req.body.totalSeats
        });
        SuccessResponse.message ="Successfully crated a flight";
        SuccessResponse.data = flight;
        return res.
                status(StatusCodes.CREATED).
                json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAllFlights(req,res){
    try {
        const flights = await FlightService.getAllFlights(req.query);
        
        SuccessResponse.data = flights;
        return res.
                status(StatusCodes.CREATED).
                json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}
/**
 * 
 * GET : /flights/:id
 * req-body : {}
 *  
 */
async function getFlightById(req,res){
    try {
        const flight = await FlightService.getFlightById(req.params.id);
        SuccessResponse.message =`Successfully get the flight with ${req.params.id} id`;
        SuccessResponse.data = flight;
        return res.
                status(StatusCodes.OK).
                json(SuccessResponse);        
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function updateRemainingSeats(req,res){
    try {
        const response = await FlightService.updateRemainingSeats({
            flightId:req.params.id,
            seats:req.body.seats,
            dec:req.body.dec
        })
        SuccessResponse.message ='Successfully update the remaining seats of the flight';
        SuccessResponse.data = response;
        return res.
                status(StatusCodes.OK).
                json(SuccessResponse);  
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}
module.exports = {
    createFlight,
    getAllFlights,
    getFlightById,
    updateRemainingSeats
    
}