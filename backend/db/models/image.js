'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    spotId: DataTypes.INTEGER,
    url1: DataTypes.STRING,
    url2: DataTypes.STRING,
    url3: DataTypes.STRING,
    url4: DataTypes.STRING,
    url5: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.Spot, { foreignKey: 'spotId' })
  };
  return Image;
};
