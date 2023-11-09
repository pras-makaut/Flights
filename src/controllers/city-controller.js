const {StatusCodes} = require('http-status-codes')
const {CityService} = require('../services');
const {ErrorResponse ,SuccessResponse} = require('../utils/common');

/**
 * 
 * POST : /cities
 * req-body : {Name:'Kolkata'}
 *  
 */
async function createCity(req,res){
    try {
        const city = await CityService.createCity({
            Name:req.body.Name,
            
        });
        SuccessResponse.message ="Successfully crated a city";
        SuccessResponse.data = city;
        return res.
                status(StatusCodes.CREATED).
                json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createCity
}