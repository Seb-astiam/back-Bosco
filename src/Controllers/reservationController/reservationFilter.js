const reservationfilterHandler = require("../../Handlers/reservationHandler/reservationfilterHandler");

const reservationFilter = async (req, res) => {
  const { provinces, cities, startDate, endDate, price, estatus,email } = req.query;
console.log(provinces, cities, startDate, endDate, price, estatus);
  try {
    const reservaFiltered = await reservationfilterHandler(
      provinces,
      cities,
      price,
      startDate,
      endDate,
      estatus,
      email
    );
    return res.json(reservaFiltered);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = reservationFilter;
