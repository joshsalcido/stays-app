'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    url1: DataTypes.STRING,
    url2: DataTypes.STRING,
    url3: DataTypes.STRING,
    url4: DataTypes.STRING,
    url5: DataTypes.STRING
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
    Spot.belongsTo(models.User, { foreignKey: 'userId'})
    Spot.hasMany(models.Review, {
      foreignKey: 'spotId',
      onDelete: 'CASCADE',
      hooks: true
    })
    Spot.hasMany(models.Image, {
      foreignKey: 'spotId',
      onDelete: 'CASCADE',
      hooks:true
    })
  };
  return Spot;
};
