require("dotenv").config();
const { Sequelize } = require("sequelize");
const {  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const HousingModel = require("./Models/Housing");
const MascotaModel = require("./Models/Mascota");
const UserModel = require("./Models/usuario");
const ProfileModel = require("./Models/Profile");
const ReservationModel = require("./Models/Reservation");
const RoleModel = require("./Models/Role");
const ServiceModel = require("./Models/Service");


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
ReservationModel(sequelize);

const { Housing, UserMascota, User, Service, Role, Company, Profile, Reservation } =
  sequelize.models;

User.hasOne(Housing);
Housing.belongsTo(User);

User.hasMany(UserMascota);
UserMascota.belongsTo(User);
Housing.belongsToMany(Service, { through: "ServicexHousing" });
Service.belongsToMany(Housing, { through: "ServicexHousing" });

User.hasOne(Profile);
Profile.belongsTo(User);

Housing.belongsToMany(Reservation, { through: "ReservationxHousing" });
Reservation.belongsToMany(Housing, { through: "ReservationxHousing" });


UserMascota.belongsToMany(Reservation, { through: "ReservationxUserMascota" });
Reservation.belongsToMany(UserMascota, { through: "ReservationxUserMascota" });



module.exports = {
  conn: sequelize,
  Housing,
  UserMascota,
  User,
  Service,
  Role,
  Company,
  Profile,
  Reservation,
  
};


