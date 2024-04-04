const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Profile", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    surname:{
      type:DataTypes.STRING,
      allowNull:false
    },
    genre:{
      type:DataTypes.STRING,
      allowNull:false
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
    },
    housingProfile: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    petProfile: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
