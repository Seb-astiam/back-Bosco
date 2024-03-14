const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Service", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};