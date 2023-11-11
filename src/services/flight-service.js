const {StatusCodes} = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const {compareDate} = require('../utils/helpers/datetime-helper')

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


module.exports = {
    createFlight
}