const { DataTypes } = require("sequelize");

module.exports=(sequelize)=>{
    sequelize.define('RatingPet', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
     
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
    });
}