const getHousingFilteredHandler = require("../../Handlers/HousinhandlerV2/GetHousingFiltered");

const getHousingFiltered = async (req, res) => {
  const {
    location,
    serviceId,
    square,
    maxPrice,
    startDate,
    endDate,
    orderBy,
    orderDirection,
  } = req.query;
  try {
    const housingFiltered = await getHousingFilteredHandler(
      location,
      serviceId,
      square,
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
