const {DataTypes} = require ("sequelize");

module.exports= (sequelize) => {
    sequelize.define("Housing",
     {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        typo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        servicio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        plaza: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM("disponible", "ocupado", "mantenimiento"),
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }

     })
}