const CrudRepository = require('./crudrepository');

const { Airplane } = require('../models');

class AirplaneRepository extends CrudRepository {
    constructor(){
        super(Airplane);
    }
}

module.exports = AirplaneRepository;