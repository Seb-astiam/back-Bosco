// notification.model.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Notification = sequelize.define('Notification', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    
    type: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT, 
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN, 
      defaultValue: false
    }
  });

  return Notification;
};
