// ReservaAll.js
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
    status: {
            type: DataTypes.ENUM('pendiente', 'aprobada', 'cancelada'),
             allowNull: false,
             defaultValue: 'pendiente'
          },
    // Otros campos que desees para la relación
  });

  return Reservation;
};


// opcion 2
// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   const Reserva = sequelize.define('Reserva', {
//     // Definir campos del modelo Reserva
//     fechaInicio: {
//       type: DataTypes.DATE,
//       allowNull: false
//     },
//     fechaFin: {
//       type: DataTypes.DATE,
//       allowNull: false
//     },
//     estado: {
//       type: DataTypes.ENUM('pendiente', 'aprobada', 'cancelada'),
//       allowNull: false,
//       defaultValue: 'pendiente'
//     },
//     // Otros campos según sea necesario
//   });

//   return Reserva;
// };