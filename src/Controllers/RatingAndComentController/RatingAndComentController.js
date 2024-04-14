const { Reservation, Housing, User, UserMascota, RatingHousing } = require("../../DB_conection");

const postReviewController = async ({ id_alojamiento, fecha, comentario, valoracion}) => {
    try { 
      // id_Alojamiento = id_reserva
      const reserva = await Reservation.findOne({
        where: {
          id: id_alojamiento
        },
        include: {
          model: Housing,
        }
      })
      const idAlojamiento = reserva.Housings[0].id

        const  createCalificationHousing= await RatingHousing.create({ id_alojamiento: idAlojamiento, fecha, comentario, valoracion });
        await createCalificationHousing.addReservation(id_alojamiento);
        const idReservation = await Reservation.findByPk(id_alojamiento)
        if(idReservation)
       return true
    } catch (error) {
        throw Error(error.message);
    }
};




const getReviewsAlojamientoController = async (idReserva) => {
  try {
      const reserva = await Reservation.findByPk(idReserva, {
          include: {
              model: RatingHousing,
              through: {}
          }
      });

      if (!reserva) {
          throw new Error("La reserva no existe");
      }

      return reserva.RatingHousings.map(rating => {
          return {
              comentario: rating.comentario,
              valoracion: rating.valoracion
          };
      });
  } catch (error) {
      throw new Error(error.message);
  }
};

const getAllReviewHousingController = async (idAlojamiento) => {
    try {
        const alojamientoReseña = await Housing.findByPk(idAlojamiento, {
          attributes: ["title"],
          include: [
            {
              model: Reservation,
              attributes: ['id', 'UserMascotumId'],
              through: {},
              include: {
                model: RatingHousing,
                attributes: ['comentario', 'valoracion'],
                through: {}
              }
            },
            
          ]
        })

        const reservasycomentarios = alojamientoReseña.Reservations.map((reseña) => {
          const comentarios = reseña.RatingHousings.map((comentario) => {
              return {comentario: comentario.comentario, valoracion: comentario.valoracion}
          })

          return comentarios
        }).flat()

      return reservasycomentarios
    } catch (error) {
      console.error(error)
    }
}




module.exports = { postReviewController, getReviewsAlojamientoController, getAllReviewHousingController };
