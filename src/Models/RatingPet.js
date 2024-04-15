const { DataTypes } = require("sequelize");

module.exports=(sequelize)=>{
    sequelize.define('RatingPet', {
        comentario: {
          type: DataTypes.STRING,
          allowNull: false
        },
        valoracion: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      });
}