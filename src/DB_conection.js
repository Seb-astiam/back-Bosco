require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const HousingModel = require("./Models/Housing");
const MascotaModel = require("./Models/Mascota");
const UserModel = require("./Models/User");
const ProfileModel = require("./Models/Profile");
const ServiceModel = require("./Models/Service");
const RoleModel = require("./Models/Role");


const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);

HousingModel(sequelize);
MascotaModel(sequelize);
UserModel(sequelize);
ProfileModel(sequelize);
ServiceModel(sequelize)
RoleModel(sequelize)

const { Housing, UserMascota, User, Service, Role, Company, Profile } = sequelize.models;


User.hasOne(Housing);
Housing.belongsTo(User);

User.belongsToMany(Role ,{ through: 'userRol' });
Role.belongsToMany(User ,{ through: 'userRol' });

User.hasMany(UserMascota);
UserMascota.belongsTo(User);
Housing.belongsToMany(Service, { through: "ServicexHousing" })


User.hasOne(Profile);
Profile.belongsTo(User);


module.exports = { conn: sequelize, Housing, UserMascota, User, Service, Role, Company, Profile };

<<<<<<< HEAD
=======
User.belongsToMany(Service ,{ through: 'userServices' });
Service.belongsToMany(User ,{ through: 'userServices' });

module.exports = { conn: sequelize, Housing, UserMascota, User, Service, Role, Company };
>>>>>>> 1d3c03ca3c23cf0caa00b00c18feb3ba36bc74e3
