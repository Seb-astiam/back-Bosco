const { User, Housing } = require("../../DB_conection");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const UpdateHosingsHandler = async (housingData, services,id) => {
// const newIdservice = services.split(",").map(Number);
 
    try {
      
  
      // Buscar el alojamiento a actualizar
      const housing = await Housing.findOne({
        where: {id},
      });
  
      if (!housing) {
        throw new Error("Alojamiento no encontrado para este usuario");
      }
  
      // Actualizar el registro de Housing con los nuevos datos
      await housing.update({
        ...housingData,
        type: "test",
      });
  
      // Actualizar los servicios asociados al alojamiento
      await housing.setServices(services);
  
      return housing;
    } catch (error) {
      throw new Error(`Error al actualizar el alojamiento: ${error.message}`);
    }
  };
  
  module.exports = UpdateHosingsHandler;
  



