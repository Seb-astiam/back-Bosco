require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_PORT,DB_USER,DB_HOST,DB_PASSWORD,DB_NAME } = process.env;
const HousingModel = require("./Models/Housing");
const MascotaModel = require("./Models/Mascota");
const UserModel = require("./Models/usuario");
const ProfileModel = require("./Models/Profile");
const ServiceModel = require("./Models/Service");
const RoleModel = require("./Models/Role");
const ReserveModel = require("./Models/Reserve");

const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);

// const sequelize = new Sequelize( DB_PORT, { logging: false, native: false }
// );

HousingModel(sequelize);
MascotaModel(sequelize);
UserModel(sequelize);
ProfileModel(sequelize);
ServiceModel(sequelize);
RoleModel(sequelize);
ReserveModel(sequelize);

const { Housing, UserMascota, User, Service, Role, Company, Profile , Reserve} =
  sequelize.models;

User.hasOne(Housing);
Housing.belongsTo(User);

User.hasMany(UserMascota);
UserMascota.belongsTo(User);
Housing.belongsToMany(Service, { through: "ServicexHousing" });
Service.belongsToMany(Housing, { through: "ServicexHousing" });

User.hasOne(Profile);
Profile.belongsTo(User);

// En tu modelo Reserve
Reserve.hasOne(UserMascota, { foreignKey: 'reserveId' });
UserMascota.belongsTo(Reserve, { foreignKey: 'reserveId' });

Reserve.hasOne(Housing, { foreignKey: 'reserveId' });
Housing.belongsTo(Reserve, { foreignKey: 'reserveId' });


module.exports = {
  conn: sequelize,
  Housing,
  UserMascota,
  User,
  Service,
  Role,
  Company,
  Profile,
  Reserve
};
