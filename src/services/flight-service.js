const {StatusCodes} = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const {Op} = require('sequelize');
const {compareDate} = require('../utils/helpers/datetime-helper');
const flightrepository = new FlightRepository();

async function createFlight(data){
    try {
        if(compareDate(data.arrivalTime,data.departureTime)){
            throw new AppError('departure time should be greater than arrival time',StatusCodes.INTERNAL_SERVER_ERROR);
        }
        const flight = await flightrepository.createData(data);
        return flight;
    } catch (error) {
        
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw error;
        
    }
}

async function getAllFlights(query){
    let customFilter= {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";

    if(query.trips ){
        [departureAirportId,arrivalAirportId] = query.trips.split('-');
        customFilter.departureAirportId=departureAirportId;
        customFilter.arrivalAirportId=arrivalAirportId;
    }

    if(query.price){
        [minPrice,maxPrice] = query.price.split('-');
        customFilter.price = {
            [Op.between]:[minPrice,((maxPrice== undefined) ? 20000:maxPrice)]
        }

    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]:query.travellers
        }
    }

    if(query.tripDate){
        customFilter.departureTime = {
            [Op.between] : [query.tripDate ,  query.tripDate + endingTripTime]
        }
    }
    if(query.sort){
        const params= query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_') );
        sortFilter = sortFilters;
    }
    try {
        let flights = await flightrepository.getAllFlights(customFilter,sortFilter);
    
        return flights;
    } catch (error) { 
        throw new AppError('Cannot fetch data of all the flights',StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function getFlightById(id){
    try {
        const flight = await flightrepository.get(id); 
        return flight;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(error.message,error.statusCode);
        }
        throw new AppError(`Cannot fetch the flight with id ${id}`,StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function updateRemainingSeats(data){
    try {
        const response = await flightrepository.updateRemainingSeats(data.flightId,data.seats,data.dec);
        return response;
    } catch (error) {
        console.log(error)
        throw new AppError('Cannot update data of flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlightById,
    updateRemainingSeats
}