const { Reservation,  UserMascota, RatingPet } = require("../../DB_conection");

const postReviewPetController = async ({ id_userMascota, fecha,  comentario, valoracion}) => {
    try { 
      const userMascotaData = await UserMascota.findByPk(id_userMascota, {
        include: [Reservation], // Incluir las reservas asociadas al usuario de mascota
    });
          
          if (!userMascotaData) {
            throw new Error("Usuario de mascota no encontrado");
        }      


        const  createCalificationUserMascota= await RatingPet.create({ id_userMascota, fecha, comentario,  valoracion });

        const id_reserva = userMascotaData.Reservations[0];
        if (!id_reserva) {
          throw new Error("No se encontró ninguna reserva asociada al usuario de mascota");
      }
      await id_reserva.addRatingPet(createCalificationUserMascota);
       return true

    } catch (error) {
        throw Error(error.message);
    }
};

const getAllReviewsPetController  = async (id) => {
    try {
      // Buscar la revisión por su ID
      const review = await RatingPet.findByPk(id);
      
      if (!review) {
        throw new Error("La revisión no existe");
      }
      
      return review;
    } catch (error) {
      throw new Error(error.message);
    }
  };





const getReviewsPetController = async () => {
  try {
    // Buscar todos los comentarios
    const allReviews = await RatingPet.findAll();
    
    if (!allReviews || allReviews.length === 0) {
      throw new Error("No hay reseñas disponibles");
    }
    
    return allReviews;
  } catch (error) {
    throw new Error(error.message);
  }
};




module.exports = { postReviewPetController, getAllReviewsPetController, getReviewsPetController };