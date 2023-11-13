const CrudRepository = require('./crudrepository');

const { Airport } = require('../models');

class AirportRepository extends CrudRepository {
    constructor(){
        super(Airport);
    }
    async getAirportByCode(filter){
        console.log(filter)
        const airports = await Airport.findOne({
            where:filter,
        })
        return airports;
    }

}

module.exports = AirportRepository;