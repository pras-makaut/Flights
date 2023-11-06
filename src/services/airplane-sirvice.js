const { AirplaneRepository } = require('../repositories');

const airplanerepositry = new AirplaneRepository();
async function createAirplane(data){
    try {
        const airplane = await airplanerepositry.createData(data);
        return airplane;
    } catch (error) {
        throw error;
        
    }
}

module.exports = {
    createAirplane
}