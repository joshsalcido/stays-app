'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Reviews', [
        {
        userId: 12,
        spotId: 122,
        review: "Such a great stay! The kids loved the dragon shape of the house!",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // {
      //   userId:,
      //   spotId:,
      //   review:,
      //   rating:,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   userId:,
      //   spotId:,
      //   review:,
      //   rating:,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Reviews', null, {});
  }
};
