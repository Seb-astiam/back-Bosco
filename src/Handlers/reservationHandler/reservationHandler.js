const {
  postReservationController,
  getAllReservationController,
  getReservationsAlojamientoController,
  updateReservationController,
  updateEstadoPagoController
} = require("../../Controllers/reservationController/reservationController");

const postReservationHandler = async (req, res) => {
  const {
    id_alojamiento,
    email_usuario,
    fechaInicio,
    fechaFin,
    horaInicio,
    horaFin,
    UserMascotumId,
  } = req.body;
  try {
    const hourlyReservation =
      !id_alojamiento ||
      !email_usuario ||
      !fechaInicio ||
      !horaInicio ||
      !horaFin ||
      !UserMascotumId;

    const daylyReservation =
      !id_alojamiento ||
      !email_usuario ||
      !fechaInicio ||
      !fechaFin ||
      !UserMascotumId;
    if (hourlyReservation && daylyReservation) {
      return res
        .status(400)
        .send("Falta información para registrar la reserva");
    }
    const registroReserva = await postReservationController({
      id_alojamiento,
      email_usuario,
      fechaInicio,
      fechaFin,
      horaInicio,
      horaFin,
      UserMascotumId,
    });

    if (registroReserva) {
      return res.status(201).send("Reserva creada exitosamente");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllReservationHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const historialReserva = await getAllReservationController(id);

    if (historialReserva === "no hay reservas registradas a este usuario") {
      return res.status(400).send("no hay reservas registradas a este usuario");
    }

    return res.status(200).json(historialReserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReservationsAlojamientoHandler = async (req, res) => {
  const { identificacion } = req.params;
  try {
    const reservaciones = await getReservationsAlojamientoController(
      identificacion
    );
    return res.status(200).json(reservaciones);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateReservationHandler = async (req, res) => {
  const { status, id_reserva } = req.body;

  try {
    const estadoReserva = await updateReservationController({
      status,
      id_reserva,
    });

    return res.status(200).json(estadoReserva);
  } catch (error) {
    res.status(500).send("Error actualizando servicio: " + error.message);
  }
};

const updateEstadoPagoHandler = async(req, res) => {
  const { id_reserva } = req.body;

  try {
    let estadoParaBotonDePago = true
    const estadoReserva = await updateEstadoPagoController(estadoParaBotonDePago, id_reserva);
    return res.status(200).json(estadoReserva);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  postReservationHandler,
  getAllReservationHandler,
  getReservationsAlojamientoHandler,
  updateReservationHandler,
  updateEstadoPagoHandler
};
