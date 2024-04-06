const updateTypeHandler = require('../../Handlers/HousingTypehandler/updateHandler')
const updateTypeController = async (req, res) => {
    const { id } = req.params
    const newType= req.body
    try {
  
      await updateTypeHandler(id,newType);
  
      res.status(200).json({
        message: "Type actualizado correctamente",
      });
    } catch (error) {
      res.status(500).send("Error actaulizando Type: " + error.message);
    }
  };
  module.exports=updateTypeController

