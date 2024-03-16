const { User, Housing } = require("../../DB_conection");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const AddHousingsHandler = async (housingData, email, services) => {
  const newIdservice = services.split(",").map(Number); // esto me llevo tiempo y era una pendejera
  console.log(newIdservice);
  try {
    // Buscar al usuario por su correo electrónico
    const id = await User.findOne({
      where: { email },
      attributes: ["id"], // Solo recuperar el ID del usuario
    });
    console.log("soy el id", id);
    if (!id) {
      throw new Error("Usuario no encontrado");
    }

    // Crear el registro de Housing con el ID del usuario y las rutas de las imágenes
    const housing = await Housing.create({
      ...housingData,
      type: "test",
      UserId: id.dataValues.id, // Asignar el ID del usuario al campo userId en Housing
    });

    // agregar los datos en la tabla intermedia.
    await housing.addServices(newIdservice);

    return housing;
  } catch (error) {
    throw new Error(`Error al crear el alojamiento: ${error.message}`);
  }
};

module.exports = AddHousingsHandler;
