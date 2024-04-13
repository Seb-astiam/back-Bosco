const { Reservation, User, Housing } = require("../../DB_conection");

const postReservationController = async ({
  id_alojamiento,
  email_usuario,
  fechaInicio,
  fechaFin,
  horaInicio,
  horaFin,
  UserMascotumId,
}) => {
  try {
    const idUser = await User.findOne({
      where: {
        email: email_usuario,
      },
      attributes: ["id"],
    });

    const registroReserva = await Reservation.create({
      fechaInicio,
      fechaFin,
      horaInicio,
      horaFin,
      UserMascotumId,
    });

    await registroReserva.addUsers(idUser.dataValues.id);
    await registroReserva.addHousings(id_alojamiento);

    const confirmacionReserva = await Reservation.findByPk(registroReserva.id);

    if (confirmacionReserva) return true;
  } catch (error) {
    throw Error(error.message);
  }
};

const getAllReservationController = async (email) => {
  try {
    const historialReserva = await Reservation.findAll({
      include: [
        {
          model: User,
          where: {
            email: email,
          },
        },
        {
          model: Housing,
          attributes: ["title", "price", "provinces", "UserId"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!historialReserva.length) {
      return "No hay reservas registradas para este usuario";
    }

    return historialReserva;
  } catch (error) {
    throw Error(error.message);
  }
};

const getReservationsAlojamientoController = async (identificacion) => {
  try {
    const userHousing = await Housing.findAll({
      where: {
        UserId: identificacion,
      },
    });

    if (!userHousing) return false;

    const vistaAlojamiento = Promise.all(
      userHousing.map(async (housing) => {
        return await Reservation.findAll({
          include: [
            {
              model: Housing,
              where: {
                id: housing.id,
              },
            },
            {
              model: User,
              attributes: ["email", "name", "id"],
            },
          ],
        });
      })
    );

    return vistaAlojamiento;
  } catch (error) {
    throw Error(error.message);
  }
};

const updateReservationController = async ({ status, id_reserva }) => {
  try {
    const reserva = await Reservation.findByPk(id_reserva);

    const actualizacion = await reserva.update(
      { estatus: status },
      { fields: ["estatus"] }
    );

    if (actualizacion.dataValues.estatus === "Success")
      return "Reserva Aceptada";

    if (actualizacion.dataValues.estatus === "Reject")
      return "Reserva Rechazada";
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  postReservationController,
  getAllReservationController,
  getReservationsAlojamientoController,
  updateReservationController,
};
