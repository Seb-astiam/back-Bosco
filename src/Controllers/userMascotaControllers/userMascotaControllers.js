const { UserMascota, User } = require("../../DB_conection");

const createUserMascotaController = async ({ image, name, type, age, raze, aggressiveness, genre, coexistence, size, UserId }) => {

    try {
      await UserMascota.create({ image, name, type, age, raze, aggressiveness, genre, coexistence, size, UserId });
      return "Mascota Creada"
    } catch (error) {
      throw new Error("Error creating userMascota: " + error.message);
    }
  };
  

const getAllUserMascotasController = async (email)=>{
  try {
    const user = await User.findOne({
      where:{
        email
      }
    });
    const userMascota = await user.getUserMascota();

    return userMascota;
  } catch (error) {
    throw new Error("Error getting userMascota: " + error.message);
  }

};

const getUserMascotasController = async (id) => {
  try {
    const userMascotas = await UserMascota.findAll({
      where: { UserId: id }
    });
    return userMascotas;
  } catch (error) {
    throw new Error("Error getting userMascota: " + error.message);
  }

};

const deleteUserMascotaController = async (id) => {
  try {
    const mascota = await UserMascota.findByPk(id);
    if (!mascota) {
      throw new Error('El UserMascota no fue encontrado');
    }
    await mascota.destroy();

  } catch (error) {
    throw new Error('Error eliminando UserMascota: ' + error.message);
  }
};

const updateUserMascotaController = async (id, newData) => {
  try {
    const mascota = await UserMascota.findByPk(id);
    if (!mascota) {
      throw new Error('UserMascota no fue encontrado');
    }
    await mascota.update(newData);
    return mascota;
  } catch (error) {
    throw new Error('Error actualizando la mascota: ' + error.message);
  }
};


const getMascotaByIdController = async (idMascota) => {
    try {
      const mascota = await UserMascota.findByPk(idMascota);
      return mascota
    } catch (error) {
        throw new Error(error)
    }
}

  module.exports = {
   createUserMascotaController,
   getAllUserMascotasController,
   deleteUserMascotaController,
   updateUserMascotaController,
   getMascotaByIdController,
   getUserMascotasController
  };
  