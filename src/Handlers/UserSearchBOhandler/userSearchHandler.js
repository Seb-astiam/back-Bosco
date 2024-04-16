const { User } = require("../../DB_conection");
const { Op } = require("sequelize");

const userSearchHandler = async (email, name) => {
  let whereClause = {};

  try {
    if (name) {
      whereClause.name = name;
    }

    if (email) {
      whereClause.email = email;
    }

    // Si se proporciona el nombre pero no el correo electrónico, buscar todos los usuarios con ese nombre
    if (name && !email) {
      const users = await User.findAll({
        where: whereClause,
        attributes: ["id", "name", "email", "picture", "status"],
      });

      if (users.length > 0) {
        return users.map(user => user.toJSON()); // Devolver los valores de los usuarios encontrados
      } else {
        throw new Error("Usuarios no encontrados con ese nombre");
      }
    }

    // Si se proporciona el correo electrónico, buscar específicamente por correo electrónico
    if (email) {
      const user = await User.findOne({
        where: whereClause,
        attributes: ["id", "name", "email", "picture", "status"],
      });

      if (user) {
        return user // Devolver los valores del usuario encontrado
      } else {
        throw new Error("Usuario no encontrado con ese correo electrónico");
      }
    }

    throw new Error("Debe proporcionar al menos el nombre o el correo electrónico");
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${error.message}`);
  }
};

module.exports = userSearchHandler;
