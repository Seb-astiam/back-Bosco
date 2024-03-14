require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const HousingModel = require("./Models/Housing");
const MascotaModel = require("./Models/Mascota");
const UserModel = require("./Models/User");
const ServiceModel = require("./Models/Service");
const RoleModel = require("./Models/Role");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);

HousingModel(sequelize);
MascotaModel(sequelize);
UserModel(sequelize);

ServiceModel(sequelize)
RoleModel(sequelize)

const { Housing, UserMascota, User, Service, Role, Company } = sequelize.models;

User.hasOne(Housing);
Housing.belongsTo(User);

User.hasMany(UserMascota);
UserMascota.belongsTo(User);

module.exports = { conn: sequelize, Housing, UserMascota, User, Service, Role, Company };
