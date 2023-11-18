const CrudRepository = require('./crudrepository');
const {Sequelize,Op} = require('sequelize')
const { Flight,Airplane,Airport,City } = require('../models');
const db = require('../models');
const {addRowLock} = require('./queries');

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
    async updateRemainingSeats(flightId,seats,dec=true){
        await db.sequelize.query(addRowLock(flightId));
        const flight = await Flight.findByPk(flightId);
        if(+dec){
            await flight.decrement('totalSeats',{by:seats});
            
        }else{
            await flight.increment('totalSeats',{by:seats});   
        }
        return flight;
    }
}

module.exports = FlightRepository;