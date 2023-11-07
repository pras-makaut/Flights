'use strict';
const {Op} = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
    */
    await queryInterface.bulkInsert('Airplanes', [
      {
        modelNumber:"airbnb1",
        capacity:120,
        createdAt:new Date(),
        updatedAt : new Date()
      },
      {
        modelNumber:"airbnb2",
        capacity:140,
        createdAt:new Date(),
        updatedAt : new Date()
      },
      {
        modelNumber:"airbnb3",
        capacity:190,
        createdAt:new Date(),
        updatedAt : new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airplanes', {[Op.or]:[{modelNumber:"airbnb3"},{modelNumber:"airbnb2"}]});
  }
};
