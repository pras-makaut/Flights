const {StatusCodes} = require('http-status-codes')
const {AirportService} = require('../services');
const {ErrorResponse ,SuccessResponse} = require('../utils/common');
/**
 * 
 * POST : /airports
 * 
 *  
 */
async function createAirport(req,res){
    try {
        const airport = await AirportService.createAirport({
            name:req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId:req.body.cityId
        });
        SuccessResponse.message ="Successfully crated an airports";
        SuccessResponse.data = airport;
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
 * GET : /airports
 * req-body : {}
 *  
 */
async function getAllAirports(req,res){
    try {
        const airports = await AirportService.getAllAirports();
        SuccessResponse.message ="Successfully get all airports";
        SuccessResponse.data = airports;
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
 * GET : /airplanes/:id
 * req-body : {}
 *  
 */
async function getAirportById(req,res){
    try {
        const airports = await AirportService.getAirportById(req.params.id);
        SuccessResponse.message =`Successfully get the airport with ${req.params.id} id`;
        SuccessResponse.data = airports;
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
 * DELETE : /airplorts/:id
 * req-body : {}
 *  
 */
async function deleteAirportById(req,res){
    try {
        const airports = await AirportService.deleteAirportById(req.params.id);
        SuccessResponse.message =`Successfully delete the airport with ${req.params.id} id`;
        SuccessResponse.data = airports;
        return res.
                status(StatusCodes.OK).
                json(SuccessResponse);        
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}
async function updateAirport(req,res){
    try {
        console.log(req.body);
        const airports = await AirportService.updateAirport(req.body.id,req.body);
        SuccessResponse.message =`Successfully update the airport with ${req.body.id} id`;
        SuccessResponse.data = airports;
        return res.
                status(StatusCodes.OK).
                json(SuccessResponse);        
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirport,
    getAllAirports,
    getAirportById,
    deleteAirportById,
    updateAirport
}