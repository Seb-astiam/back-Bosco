const {Housing} = require('../../DB_conection')

const OcupancyReport = async (req, res) => {
    const {location} = req.query;
  
    try {
      // Consulta para obtener la cantidad total de alojamientos en una ubicación
      const cantidadTotal = await Housing.count({
        where: { location :location}
      });
  
      // Consulta para obtener la cantidad de alojamientos ocupados en una ubicación
      const cantidadOcupados = await Housing.count({
        where: { location, availability: true} // Suponiendo que tienes un campo "ocupado" en tu modelo Housing
      });
  
      // Calcula la cantidad de alojamientos disponibles restando los ocupados de los totales
      const cantidadDisponibles = cantidadTotal - cantidadOcupados;
  
      // Calcula el porcentaje de ocupación
      const porcentajeOcupacion = (cantidadOcupados / cantidadTotal) * 100;
  
      // Envía la respuesta con los datos del reporte
      res.status(200).json({
        cantidadTotal,
        cantidadOcupados,
        cantidadDisponibles,
        porcentajeOcupacion
      });
    } catch (error) {
      console.error('Error al generar el reporte de ocupación:', error);
      res.status(500).json({ error: 'Error al generar el reporte de ocupación' });
    }
  };
  

module.exports= OcupancyReport;

