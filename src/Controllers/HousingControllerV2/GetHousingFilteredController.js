const getHousingFilteredHandler = require("../../Handlers/HousinhandlerV2/GetHousingFiltered");

const getHousingFiltered = async (req, res) => {
  const {
    title,
    provinces,
    cities,
    serviceId,
    square,
    minPrice,
    maxPrice,
    hourly, //horas(true) o dias(false)
    startHour, //
    endHour, //
    startDate,
    endDate,
    orderBy,
    orderDirection,
  } = req.query;

  try {
    const housingFiltered = await getHousingFilteredHandler(
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
    );
    return res.json(housingFiltered);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getHousingFiltered;
