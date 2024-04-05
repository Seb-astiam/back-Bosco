const { User } = require("../../DB_conection");



const userSearcHandler = async ( email) => {
       

  try {



    // Buscar al usuario por su correo electrónico
    const user = await User.findOne({
        where: {
          // id: id,
          // name: name,
          email: email
        },
        attributes: ["id","name", "email", "picture","status"],
      });
      
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  } catch (error) {
    throw new Error(`Error al tener el usuario ${error.message}`);
  }
};

module.exports = userSearcHandler;
