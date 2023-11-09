const {StatusCodes} = require('http-status-codes')
const {AirplaneService} = require('../services');
const {ErrorResponse ,SuccessResponse} = require('../utils/common');
/**
 * 
 * POST : /airplanes
 * req-body : {modelNumber:'airbus320' , capacity : 200}
 *  
 */
async function createAirplane(req,res){
    try {
        console.log(req.body);
        const airplane = await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.message ="Successfully crated an airplane";
        SuccessResponse.data = airplane;
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
 * GET : /airplanes
 * req-body : {}
 *  
 */
async function getAllAirplanes(req,res){
    try {
        const airplanes = await AirplaneService.getAllAirplanes();
        SuccessResponse.message ="Successfully get all airplanes";
        SuccessResponse.data = airplanes;
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
async function getAirplaneById(req,res){
    try {
        const airplanes = await AirplaneService.getAirplaneById(req.params.id);
        SuccessResponse.message =`Successfully get the airplane with ${req.params.id} id`;
        SuccessResponse.data = airplanes;
        return res.
                status(StatusCodes.OK).
                json(SuccessResponse);        
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
    getAllAirplanes,
    getAirplaneById
}