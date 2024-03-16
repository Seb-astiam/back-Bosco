const getHousingWithServicesHandler = require("../../Handlers/HousinhandlerV2/GetHosuingHandler");

const getHousingWithServices = async (req, res) => {
  const { location } = req.query;

  try {
    const housingWithServices = await getHousingWithServicesHandler(location);
    res.status(200).json(housingWithServices);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getHousingWithServices;
