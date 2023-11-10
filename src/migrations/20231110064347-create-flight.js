'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flighNumber: {
        type: Sequelize.STRING,
        allowNull:false
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Airplanes',
          key:'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      departureAirportId: {
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model:'Airports',
          key:'code'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      arrivalAirportId: {
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model:'Airports',
          key:'code'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      boardingGate: {
        type: Sequelize.STRING,
        
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};