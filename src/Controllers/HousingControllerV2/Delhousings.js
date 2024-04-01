const Delhousingshandlers = require('../../Handlers/HousinhandlerV2/DelhousingsHandler')

const Delhousings =async ( req, res)=>{

    const  {id}= req.params
  try {
     if(!id) return  new Error ('falta el id')

     await  Delhousingshandlers(id) 

    res.status(200).json({
        message: "Servicio eliminado correctamente",
      });
  } catch (error) {
    res.status(500).send("Error eliminando servicio: " + error.message);
  }


}
module.exports= Delhousings