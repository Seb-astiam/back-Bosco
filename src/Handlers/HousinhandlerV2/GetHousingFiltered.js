const { Housing, Service } = require("../../DB_conection");
const { Op } = require("sequelize");

const includeAll = (serviceId) => {
  if (serviceId) {
    return (include = [
      {
        model: Service,
        where: { id: serviceId },
        attributes: ["id", "type"], // Incluye solo los atributos que necesitas
        through: { attributes: [] }, // No incluye los atributos de la tabla intermedia
      },
    ]);
  } else {
    return (include = [
      {
        model: Service,
        attributes: ["id", "type"], // Incluye solo los atributos que necesitas
        through: { attributes: [] }, // No incluye los atributos de la tabla intermedia
      },
    ]);
  }
};

const getHousingFilteredHandler = async (
  provinces,
  cities,
  serviceId,
  square,
  minPrice,
  maxPrice,
  startDate,
  endDate,
  orderBy,
  orderDirection
) => {
  let order = [];
  if (orderBy && orderDirection) order = [[orderBy, orderDirection]];

  let where = { availability: true };

  if (provinces) where = { ...where, provinces };

  if (cities) where = { ...where, cities };

  if (square) where = { ...where, square: { [Op.gte]: square } };

  if (maxPrice && !minPrice)
    where = { ...where, price: { [Op.lte]: maxPrice } };
  if (!maxPrice && minPrice)
    where = { ...where, price: { [Op.gte]: minPrice } };
  if (maxPrice && minPrice)
    where = { ...where, price: { [Op.between]: [minPrice, maxPrice] } };

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

  try {
    let include = includeAll(serviceId);

    const housingFiltered = await Housing.findAll({ include, where, order });

    return housingFiltered;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = getHousingFilteredHandler;
