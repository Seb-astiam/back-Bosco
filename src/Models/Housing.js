const {DataTypes} = require ("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Housing", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        square: {
            type: DataTypes.STRING,
            allowNull: false
        },
        availability: {
            type: DataTypes.ENUM("availability", "busy", "maintenance"),
            allowNull: false
        }
    });
};