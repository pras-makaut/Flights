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

module.exports = {
    createCity
}