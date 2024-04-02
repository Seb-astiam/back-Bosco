const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Reservation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
   
   fechaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },

    fechaFin: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },

    estatus: {
      type: DataTypes.ENUM('Pending', 'Success', 'Reject'),
      allowNull: false,
      defaultValue: 'Pending'
    },
  });

};

