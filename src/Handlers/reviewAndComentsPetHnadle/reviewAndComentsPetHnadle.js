const { postReviewPetController, getAllReviewsPetController, getReviewsPetController } = require("../../Controllers/RantingAndComentPetController/RantingAndComentPetController");


const postReviewPetHandler = async (req, res) => {
  const { id_userMascota, fecha, comentario,valoracion} = req.body;

  try {
    if ( !id_userMascota || !fecha ||  !comentario ||!valoracion){
      return res.status(400).send("Falta información");
    }
    const registroReview = await postReviewPetController({ id_userMascota, fecha,  comentario, valoracion });

    if (registroReview) {
      return res.status(201).send("Reseña creada exitosamente");
    } 
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const getAllReviewPetHandler = async (req, res) => {
    const { id } = req.params;

  try {
    const allReviews = await getAllReviewsPetController (id);

    if (allReviews === 'no hay reseñas sobre este usuario') {
      return res.status(400).send("no hay reseñas sobre este usuario");
    } 

    return res.status(200).json(allReviews) 
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};



const getReviewsPetHandler = async (req, res) => {
  try {
    const allReviews = await getReviewsPetController();

    if (!allReviews || allReviews.length === 0) {
      return res.status(400).send("No hay reseñas disponibles");
    } 

    return res.status(200).json(allReviews) 
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};



module.exports = {postReviewPetHandler, getAllReviewPetHandler, getReviewsPetHandler};