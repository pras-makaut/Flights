const {StatusCodes} = require('http-status-codes');
const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityrepository = new CityRepository();

async function createCity(data){
    try {
        const city = await cityrepository.createData(data);
        return city;
    } catch (error) {
        console.log(error);
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create thenew city object',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}
async function deleteCityByid(id){
    try {
        const city = await cityrepository.destroy(id); 
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(error.message,error.statusCode);
        }
        throw new AppError('Cannot delete the airpane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateCity(id,data){
    try {

        const city = await cityrepository.update(id,data); 
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(error.message,error.statusCode);
        }
        throw new AppError('Cannot update the City',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createCity,
    deleteCityByid,
    updateCity
}