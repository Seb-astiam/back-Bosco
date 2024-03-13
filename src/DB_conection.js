require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const HousingModel = require("./Models/Housing");
const MascotaModel = require("./Models/Mascota");
const UserModel = require("./Models/User");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`,
  { logging: false, native: false }
);

HousingModel(sequelize);
MascotaModel(sequelize);
UserModel(sequelize);

const { Housing, Mascota, User } = sequelize.models;

User.hasOne(Housing);
Housing.belongsTo(User);

User.hasMany(Mascota);
Mascota.belongsTo(User);

module.exports = { conn: sequelize, Housing, Mascota, User };
