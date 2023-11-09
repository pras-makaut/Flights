const CrudRepository = require('./crudrepository');
const { City } = require('../models');
class CityRepository extends CrudRepository {
    constructor(){
        super(City);
    }
}

module.exports = CityRepository;