'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Spots', [
        {
          address: "43 Ridgecrest Dr.",
          city: "Austin",
          state: "Texas",
          country: "USA",
          name:"Fairy Tale Escape",
          price: 606,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          address:"578 N Lemuria St.",
          city: "El Prado",
          state:"New Mexico",
          country: "USA",
          name:"Charming Wood-roof Simple Survival Earthship",
          price: 120,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          address: "58 Antler Dr",
          city: "Boulder",
          state: "Colorado",
          country: "USA",
          name: "Luxe Boulder on Mtn Peak w/Hot Tub",
          price: 611,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          address: "789 Cascade Rd",
          city: "Joshua Tree",
          state: "California",
          country: "USA",
          name: "The Kellogg Doolittle House",
          price: 18500,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          address: "3794 Sun Loma Rd",
          city: "Joshua Tree",
          state: "California",
          country: "USA",
          name: "Guard Tower Suite #1 with Pool",
          price: 310,
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Spots', null, {});

  }
};
