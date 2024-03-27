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
    accommodationType
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
      orderDirection,
      accommodationType
    );
    return res.json(housingFiltered);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getHousingFiltered;
