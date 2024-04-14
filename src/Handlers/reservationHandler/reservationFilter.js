const reservationfilterController = require("../../Controllers/reservationController/reservationFilterController");

const reservationFilter = async (req, res) => {
  const { provinces, cities, startDate, endDate, price, estatus,email } = req.query;
  try {
    const reservaFiltered = await reservationfilterController(
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