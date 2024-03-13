const { DataTypes } = require("sequelize");
//Hola
module.exports = (sequelize) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
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
      defaultValue: true,
    },
  });
};
