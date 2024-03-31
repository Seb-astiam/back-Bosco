const { DataTypes } = require("sequelize");

module.exports=(sequelize)=>{
    sequelize.define('RatingHousing', {
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