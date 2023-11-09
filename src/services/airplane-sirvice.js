const {StatusCodes} = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airplanerepositry = new AirplaneRepository();
async function createAirplane(data){
    try {
        const airplane = await airplanerepositry.createData(data);
        return airplane;
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
        throw new AppError('Cannot create the new airplane object',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getAllAirplanes(){
    try {
        const airplanes = await airplanerepositry.getAll();
        return airplanes;
        
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airpane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

async function getAirplaneById(id){
    try {
        const airplane = await airplanerepositry.get(id); 
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(error.message,error.statusCode);
        }
        throw new AppError(`Cannot fetch the airpane with id ${id}`,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteAirplaneById(id){
    try {
        const airplane = await airplanerepositry.destroy(id); 
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(error.message,error.statusCode);
        }
        throw new AppError('Cannot delete the airpane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAllAirplanes,
    getAirplaneById,
    deleteAirplaneById
}