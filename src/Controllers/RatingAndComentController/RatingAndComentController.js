const { Reservation, Housing, User, UserMascota, RatingHousing } = require("../../DB_conection");

const postReviewController = async ({ id_alojamiento, fecha, comentario, valoracion}) => {
    try { 
        const housingData = await Housing.findOne({
            where: {
              id: id_alojamiento,
            },
            include: [
              {
                model: Reservation, 
                through: {}, 
              },
              
            ],
          });
          
                


        const  createCalificationHousing= await RatingHousing.create({ id_alojamiento, fecha, comentario, valoracion });


       
        const id_reserva = housingData.Reservations[0].id; 
        await createCalificationHousing.addReservation(id_reserva);

        
        
       
        const idReservation = await Reservation.findByPk(id_reserva)
        
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


module.exports = { postReviewController, getReviewsAlojamientoController };
