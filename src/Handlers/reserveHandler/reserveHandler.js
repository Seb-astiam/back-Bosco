const { createReserve, getReserve } = require("../../Controllers/reserveController/reserveControllers");
const { createService, getServices, updateService, deleteService } = require("../../Controllers/serviceController/serviceControllers");


const postReserveHandler = async (req, res) => {
  const { mascotaId,housingId,startDate,endDate,state } =
    req.body;
  try {
    if (
      !mascotaId ||
      !housingId ||
      !startDate ||
      !endDate 
    )
      return res.status(400).send("Falta información de registro");
    const newReserve = { mascotaId,housingId,startDate,endDate };

    const created = await createReserve(newReserve);

    if (created) {
      return res.status(201).send("Reserva creado exitosamente");
    } else {
      return res.status(400).send("Ya existe este reserva");
    }
  } catch (error) {
    res.status(500).send("Error creando reserva: " + error.message);
  }
};
const getAllReservesHandler = async (req, res) => {

  try {

    const reserva = await getReserve();

    if (reserva.length < 1) {
      return res.status(400).send("No se encontro ninguna reserva");
    } else {
      return res.json(reserva);
    }
  } catch (error) {
    res.status(500).send("Error buscando reserva: " + error.message);
  }
};


module.exports = { postReserveHandler, getAllReservesHandler};
