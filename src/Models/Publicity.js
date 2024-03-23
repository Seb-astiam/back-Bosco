const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Publicity", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        commercial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        cost:{
            type:DataTypes.STRING,
            allowNull:false
        },
        
    });
};