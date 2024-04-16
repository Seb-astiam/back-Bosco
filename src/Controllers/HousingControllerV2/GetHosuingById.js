const getHousingByIdHandler = require("../../Handlers/HousinhandlerV2/GetHosuingByIdHandler");

const getHousingById = async (req, res) => {
  const { id } = req.query;

  try {
    const housing = await getHousingByIdHandler(id);
    res.status(200).json(housing);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getHousingById;
