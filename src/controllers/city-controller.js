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

/**
 * 
 * DELETE : /cities/:id
 * req-body : {}
 *  
 */
async function deleteCityById(req,res){
    try {
        const city = await CityService.deleteCityByid(req.params.id);
        SuccessResponse.message =`Successfully delete the city with ${req.params.id} id`;
        SuccessResponse.data = city;
        return res.
                status(StatusCodes.OK).
                json(SuccessResponse);        
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * 
 * Patch : /cities
 * req-body : {
 *  id:1,
 *  Name:'Kolkata'
 * }
 *  
 */

async function updateCity(req,res){
    try {
        console.log(req.body);
        const city = await CityService.updateCity(req.body.id,req.body);
        SuccessResponse.message =`Successfully update the city with ${req.body.id} id`;
        SuccessResponse.data = city;
        return res.
                status(StatusCodes.OK).
                json(SuccessResponse);        
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createCity,
    deleteCityById,
    updateCity
}