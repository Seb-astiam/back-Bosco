
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Reservation = sequelize.define('Reservation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
   
    
   fecha: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    },
    estatus: {
      type: DataTypes.ENUM('pendiente', 'aprobada', 'cancelada'),
      allowNull: false,
      defaultValue: "pendiente",
    },
  
  });

  return Reservation;
};



