const CrudRepository = require('./crudrepository');

const { Flight } = require('../models');

class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight);
    }
    async getAllFlights(filter){
        const flights = await Flight.findAll({
            where:filter
        })
        return flights;
    } 
}

module.exports = FlightRepository;