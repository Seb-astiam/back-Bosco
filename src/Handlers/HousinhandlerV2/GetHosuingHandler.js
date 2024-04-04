const { Housing, Service, User } = require('../../DB_conection');


<<<<<<< HEAD
const getHousingWithServicesHandler = async (location) => {
=======
const getHousingWithServicesHandler = async (province) => {
>>>>>>> master
    try {
      let queryOptions = {
        include: [
          {
          model: Service,
          attributes: ["id", "type"], // Incluye solo los atributos que necesitas
          through: { attributes: [] }, // No incluye los atributos de la tabla intermedia
          },
          {
            model: User,
            attributes: ["name", "email"]
          }
        ]
      };
  
      if (province) {
        queryOptions = {
          ...queryOptions,
          where: {
<<<<<<< HEAD
            location: location,
=======
            province: province,
>>>>>>> master
           
          },
        };
      }
  
      const housingWithServices = await Housing.findAll(queryOptions);
  
      // Construir las URL completas para las imágenes y agregarlas a la respuesta
      
  
      return housingWithServices ;
    } catch (error) {
      throw new Error("Error al obtener alojamientos con servicios:", error);
    }
  };
  
  module.exports = getHousingWithServicesHandler;
  