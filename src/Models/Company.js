const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Company", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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