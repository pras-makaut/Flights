const CrudRepository = require('./crudrepository');
const {Sequelize,Op} = require('sequelize')
const { Flight,Airplane,Airport,City } = require('../models');

class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight);
    }
    async getAllFlights(filter,sort){
        const flights = await Flight.findAll({
            where:filter,
            order:sort,
            include:[
                {
                    model:Airplane,
                    required:true,
                    as:'airplaneDetails'
                },
                {
                    model:Airport,
                    required:true,
                    as:'departureAirport',
                    on:{
                        col1:Sequelize.where(Sequelize.col("Flight.departureAirportId"),"=" ,Sequelize.col("departureAirport.code"))
                    },
                    include:{
                        model:City,
                        required:true
                    }
                },
                {
                    model:Airport,
                    required:true,
                    as:'arrivalAirport',
                    on:{
                        col1:Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=" ,Sequelize.col("arrivalAirport.code"))
                    },
                    include:{
                        model:City,
                        required:true
                    }
                }
            ]
        })
        return flights;
    } 
}

module.exports = FlightRepository;