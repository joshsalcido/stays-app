'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Bookings', [
        {
        userId: 1,
        spotId: 1,
        startDate: "2022-09-30",
        endDate: "2022-10-7",
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
          userId: 2,
          spotId: 2,
          startDate: "2022-09-30",
          endDate: "2022-10-7",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 1,
          spotId: 3,
          startDate: "2022-10-7",
          endDate: "2022-10-14",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 3,
          spotId: 4,
          startDate: "2022-10-7",
          endDate: "2022-10-8",
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete('Bookings', null, {});
  }
};
