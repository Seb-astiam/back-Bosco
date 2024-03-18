//filtros directos
//location
//type (?)
//Rating queda pendiente por ahora

//Filtro segun tabla pivote
//Servicios (id del servicio)

//Filtros con operadores
//square (plazas :p)
//price (un maximo)
//fecha de entrada y salida (datesAvailable datesEnd)
const { Housing, Service } = require("../../DB_conection");
const { Op } = require("sequelize");

const getHousingFilteredHandler = async (
  location,
  serviceId,
  square,
  maxPrice,
  startDate,
  endDate,
  orderBy,
  orderDirection
) => {
  let order = [];
  if (orderBy && orderDirection) order = [[orderBy, orderDirection]];

  let where = { availability: true };

  if (location) where = { ...where, location };

  if (square) where = { ...where, square: { [Op.gte]: square } };

  if (maxPrice) where = { ...where, price: { [Op.lte]: maxPrice } };

  if (startDate && endDate)
    where = {
      ...where,
      datesAvailable: { [Op.lte]: startDate },
      datesEnd: { [Op.gte]: endDate },
    };

  if (startDate && !endDate)
    where = {
      ...where,
      datesAvailable: { [Op.lte]: startDate },
      datesEnd: { [Op.gte]: startDate },
    };

  let include = {
    model: Service,
    attributes: ["id", "type"], // Incluye solo los atributos que necesitas
    through: { attributes: [] }, // No incluye los atributos de la tabla intermedia
  };
  if (serviceId) {
    include.through.where.id = serviceId;
  }
  try {
    const housingFiltered = await Housing.findAll({ where, include, order });
    return housingFiltered;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = getHousingFilteredHandler;
