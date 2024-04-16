const { Housing } = require('../../DB_conection');


const getHousingByIdHandler = async (id) => {
    try {
     
      const userMascota = await Housing.findOne({
        where: {
          UserId: id
        }
      })
      return userMascota ;
    } catch (error) {
      throw new Error("Error al obtener alojamientos:", error);
    }
  };
  
  module.exports = getHousingByIdHandler;
  