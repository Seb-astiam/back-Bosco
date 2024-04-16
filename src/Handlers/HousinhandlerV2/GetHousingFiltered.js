const { Housing, Service, User } = require("../../DB_conection");
const { Op } = require("sequelize");

const includeAll = (serviceId) => {
  if (serviceId) {
    const arrService = serviceId.split(",").map((id) => Number(id));
    return (include = [
      {
        model: Service,
        where: { id: arrService },
        attributes: ["id", "type"],
        through: { attributes: [] },
      },
      {
        model: User,
        attributes: ["email"],
      },
    ]);
  } else {
    return (include = [
      {
        model: Service,
        attributes: ["id", "type"],
        through: { attributes: [] },
      },
      {
        model: User,
        attributes: ["email"],
      },
    ]);
  }
};

const getHousingFilteredHandler = async (
  title,
  provinces,
  cities,
  serviceId,
  square,
  minPrice,
  maxPrice,
  hourly,
  startHour,
  endHour,
  startDate,
  endDate,
  orderBy,
  orderDirection
) => {
  let order = [];

  if (orderBy && orderDirection) order = [[orderBy, orderDirection]];

  let where = { availability: true };

  if (title)
    where = {
      ...where,
      title: {
        [Op.iLike]: "%" + title + "%",
      },
    };

  if (provinces) where = { ...where, provinces };

  if (cities) where = { ...where, cities };

  if (square) where = { ...where, square: { [Op.gte]: square } };

  if (maxPrice && !minPrice)
    where = { ...where, price: { [Op.lte]: maxPrice } };
  if (!maxPrice && minPrice)
    where = { ...where, price: { [Op.gte]: minPrice } };
  if (maxPrice && minPrice)
    where = { ...where, price: { [Op.between]: [minPrice, maxPrice] } };
  console.log(typeof hourly, hourly);
  if (hourly === "true") {
    if (startHour && endHour) {
      where = {
        ...where,
        hourly: true,
        hourAvailable: { [Op.lte]: startHour },
        hourEnd: { [Op.gte]: endHour },
      };
    } else {
      where = {
        ...where,
        hourly: true,
      };
    }
  } else if (hourly === "false") {
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

    where = {
      ...where,
      hourly: false,
    };
  }

  try {
    let include = includeAll(serviceId);

    const housingFiltered = await Housing.findAll({ include, where, order });

    return housingFiltered;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = getHousingFilteredHandler;
