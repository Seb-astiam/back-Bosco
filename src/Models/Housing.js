const {DataTypes} = require ("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Housing", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        datesAvailable: {
            type: DataTypes.DATE,
            allowNull: true 
        },
        datesEnd: {
            type: DataTypes.DATE,
            allowNull: true 
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        location:{
            type: DataTypes.STRING,
            allowNull: false
        },
        square: {
            type: DataTypes.STRING,
            allowNull: false
        },
        availability: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        accommodationType: {
            type: DataTypes.STRING,
            allowNull: false
        },
 
    });
};