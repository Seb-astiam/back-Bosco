const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("HousingType", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    }
   
  });
};
