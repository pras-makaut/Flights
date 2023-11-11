const CrudRepository = require('./crudrepository');

const { Flight } = require('../models');

class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight);
    }
}

module.exports = FlightRepository;