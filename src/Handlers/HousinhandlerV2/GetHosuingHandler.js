const { Housing, Service } = require('../../DB_conection');


const getHousingWithServicesHandler = async (location) => {
    try {
      let queryOptions = {
        include: {
          model: Service,
          attributes: ["id", "type"], // Incluye solo los atributos que necesitas
          through: { attributes: [] }, // No incluye los atributos de la tabla intermedia
        },
      };
  
      if (location) {
        queryOptions = {
          ...queryOptions,
          where: {
            location: location,
           
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
  