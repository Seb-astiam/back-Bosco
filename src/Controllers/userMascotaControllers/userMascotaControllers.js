const { UserMascota } = require("../db");

const createUserMascotaController = async ({
    image, name, type, age, raze, aggressiveness, genre, coexistence, size
  }) => {
    try {
      const newUserMascota = await UserMascota.create({
        image, name, type, age, raze, aggressiveness, genre, coexistence, size
      });
      return newUserMascota;
    } catch (error) {
      throw new Error("Error creating userMascota: " + error.message);
    }
  };
  

  module.exports = {
   createUserMascotaController
  };
  