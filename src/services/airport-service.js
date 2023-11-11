const {StatusCodes} = require('http-status-codes');
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airportrepositry = new AirportRepository();

async function createAirport(data){
    try {
        const airport = await airportrepositry.createData(data);
        return airport;
    } catch (error) {
        console.log(error);
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create the new airport object',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}
async function getAllAirports(){
    try {
        const airports = await airportrepositry.getAll();
        return airports;
        
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airports',StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

async function getAirportById(id){
    try {
        const airport = await airportrepositry.get(id); 
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(error.message,error.statusCode);
        }
        throw new AppError(`Cannot fetch the airport with id ${id}`,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteAirportById(id){
    try {
        const airport = await airportrepositry.destroy(id); 
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(error.message,error.statusCode);
        }
        throw new AppError('Cannot delete the airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirport(id,data){
    try {

        const airport = await airportrepositry.update(id,data); 
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(error.message,error.statusCode);
        }
        throw new AppError('Cannot update the airpane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAllAirports,
    getAirportById,
    updateAirport,
    deleteAirportById
}