const { postReviewController, getReviewsAlojamientoController} = require("../../Controllers/RatingAndComentController/RatingAndComentController");


const postReviewHandler = async (req, res) => {
  const { id_alojamiento, fecha, comentario, valoracion} = req.body;

  try {
    if ( !id_alojamiento || !fecha || !comentario ||!valoracion){
      return res.status(400).send("Falta información");
    }
    const registroReview = await postReviewController({ id_alojamiento, fecha, comentario, valoracion });

    if (registroReview) {
      return res.status(201).send("Reseña creada exitosamente");
    } 
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};



const getReviewsAlojamientoHandler = async (req, res) => {

  try {
    const allReviews = await getReviewsAlojamientoController(req.params.idReserva);
  

    if (!allReviews || allReviews.length === 0) {
      return res.status(400).send("No hay reseñas disponibles");
    } 

    return res.status(200).json(allReviews) 
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};




module.exports = { postReviewHandler, getReviewsAlojamientoHandler};