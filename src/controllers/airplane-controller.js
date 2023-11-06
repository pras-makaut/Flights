const {StatusCodes} = require('http-status-codes')
const {AirplaneService} = require('../services');

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
        return res.
                status(StatusCodes.CREATED).
                json({
                    success:true,
                    message:"Successfully crated an airplane",
                    data:airplane,
                    error:{}
                });
        
    } catch (error) {

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"something went wrong",
            data:{},
            error:error
        });
        
    }
}

module.exports = {
    createAirplane
}