require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const HousingModel = require("./Models/Housing");
const MascotaModel = require("./Models/Mascota");
const UserModel = require("./Models/usuario");
const ProfileModel = require("./Models/Profile");
const ServiceModel = require("./Models/Service");
const RoleModel = require("./Models/Role");
const ReservationModel = require("./Models/Reservation");
const RatingHousingModel = require("./Models/RatingHousing");
const RatingPetModel = require("./Models/RatingPet");
const NotificationModel = require("./Models/Notification");
const HousingTypeModel = require("./Models/HousingType");

//  const sequelize = new Sequelize(
//    `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//   { logging: false, native: false }
// );


const sequelize = new Sequelize( DB_PORT, { logging: false, native: false }
);

HousingTypeModel(sequelize);
HousingModel(sequelize);
MascotaModel(sequelize);
UserModel(sequelize);
ProfileModel(sequelize);
ServiceModel(sequelize);
RoleModel(sequelize);
ReservationModel(sequelize);
RatingHousingModel(sequelize);
RatingPetModel(sequelize);
NotificationModel(sequelize);

const {
  Housing,
  UserMascota,
  User,
  Service,
  Role,
  Company,
  Profile,
  Reservation,
  RatingHousing,
  RatingPet,
  Notification,
  HousingType,
} = sequelize.models;

Housing.belongsToMany(HousingType, { through: "HosuingTypexHousing" });
HousingType.belongsToMany(Housing, { through: "HosuingTypexHousing" });

User.hasMany(Housing);
Housing.belongsTo(User);

User.belongsToMany(Role, { through: "userRol" });
Role.belongsToMany(User, { through: "userRol" });

User.hasMany(UserMascota);
UserMascota.belongsTo(User);

Housing.belongsToMany(Service, { through: "ServicexHousing" });
Service.belongsToMany(Housing, { through: "ServicexHousing" });


Reservation.belongsToMany(RatingHousing, { through: 'RatingHousingxReservation' });
RatingHousing.belongsToMany(Reservation, { through: 'RatingHousingxReservation' });

Reservation.belongsToMany(RatingPet, { through: 'ReservationxRatingPet' });
RatingPet.belongsToMany(Reservation, { through: 'ReservationxRatingPet' });

User.belongsToMany(Notification,{through: 'UserNotificaction'});
Notification.belongsToMany(User,{through: 'UserNotificaction'});

User.hasOne(Profile);
Profile.belongsTo(User);

Reservation.belongsToMany(User, { through: 'ReservaUsuario' });
User.belongsToMany(Reservation, { through: 'ReservaUsuario' });

Reservation.belongsToMany(Housing, { through: 'ReservaHousing' });
Housing.belongsToMany(Reservation, { through: 'ReservaHousing' });

UserMascota.hasMany(Reservation);
Reservation.belongsTo(UserMascota);


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
  RatingHousing,
  RatingPet,
  Notification,
  HousingType,
};
