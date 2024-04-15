const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Housing", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //nuevo : reservar por horas o por dias
    hourly: { type: DataTypes.BOOLEAN, defaultValue: false },
    hourAvailable: {
      type: DataTypes.INTEGER,
      validate: {
        max: 24,
        min: 0,
      },
    },
    hourEnd: {
      type: DataTypes.INTEGER,
      validate: {
        max: 24,
        min: 0,
      },
    },
    //
    datesAvailable: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    datesEnd: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    provinces: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cities: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    square: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    accommodationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};