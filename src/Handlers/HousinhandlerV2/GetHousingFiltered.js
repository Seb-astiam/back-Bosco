<<<<<<< HEAD
const { Housing, Service } = require("../../DB_conection");
=======
const { Housing, Service, User } = require("../../DB_conection");
>>>>>>> master
const { Op } = require("sequelize");

const includeAll=(serviceId)=>{
  if(serviceId){
    return include = [
    {
      model: Service,
      where: { id: serviceId },
      attributes: ["id", "type"], // Incluye solo los atributos que necesitas
      through: { attributes: [] }, // No incluye los atributos de la tabla intermedia
    },
<<<<<<< HEAD
=======
    {
      model: User,
      attributes: ["email"], // Incluye el correo electrónico del usuario
    },
>>>>>>> master
  ]}
  else {
    return include = [
      {
        model: Service,
        attributes: ["id", "type"], // Incluye solo los atributos que necesitas
        through: { attributes: [] }, // No incluye los atributos de la tabla intermedia
      },
<<<<<<< HEAD
=======
      {
        model: User,
        attributes: ["email"], // Incluye el correo electrónico del usuario
      },
>>>>>>> master
    ]

  }
  
}


const getHousingFilteredHandler = async (
<<<<<<< HEAD
  location,
  serviceId,
  square,
=======
  provinces,
  cities,
  serviceId,
  square,
  minPrice,
>>>>>>> master
  maxPrice,
  startDate,
  endDate,
  orderBy,
  orderDirection
) => {
  let order = [];
  if (orderBy && orderDirection) order = [[orderBy, orderDirection]];

  let where = { availability: true };

<<<<<<< HEAD
  if (location) where = { ...where, location };

  if (square) where = { ...where, square: { [Op.gte]: square } };

  if (maxPrice) where = { ...where, price: { [Op.lte]: maxPrice } };
=======
  if (provinces) where = { ...where, provinces };

  if (cities) where = { ...where, cities };

  if (square) where = { ...where, square: { [Op.gte]: square } };

  if (maxPrice && !minPrice)
    where = { ...where, price: { [Op.lte]: maxPrice } };
  if (!maxPrice && minPrice)
    where = { ...where, price: { [Op.gte]: minPrice } };
  if (maxPrice && minPrice)
    where = { ...where, price: { [Op.between]: [minPrice, maxPrice] } };
>>>>>>> master

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
<<<<<<< HEAD
    let include= includeAll(serviceId)

      
      const housingFiltered = await Housing.findAll({include, where, order });
      
  
      return housingFiltered;
      
   

  
    
=======
    let include = includeAll(serviceId);

    const housingFiltered = await Housing.findAll({ include, where, order });

    return housingFiltered;
>>>>>>> master
  } catch (error) {
    throw Error(error.message);
  }
};

<<<<<<< HEAD
module.exports = getHousingFilteredHandler;
=======
module.exports = getHousingFilteredHandler;
>>>>>>> master
