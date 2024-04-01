const getHousingFilteredHandler = require("../../Handlers/HousinhandlerV2/GetHousingFiltered");

const getHousingFiltered = async (req, res) => {
  const {
    provinces,
    cities,
    serviceId,
    square,
    minPrice,
    maxPrice,
    startDate,
    endDate,
    orderBy,
    orderDirection,
  } = req.query;

  try {
    const housingFiltered = await getHousingFilteredHandler(
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
    );
    return res.json(housingFiltered);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getHousingFiltered;
