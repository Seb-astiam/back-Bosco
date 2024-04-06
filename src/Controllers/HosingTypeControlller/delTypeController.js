const delTypeHandler = require('../../Handlers/HousingTypehandler/delTypeHandler')
const delTypeController = async (req, res) => {
    const { id } = req.params
    try {
  
      await delTypeHandler(id);
  
      res.status(200).json({
        message: "Type eliminado correctamente",
      });
    } catch (error) {
      res.status(500).send("Error eliminando Type: " + error.message);
    }
  };
  module.exports=delTypeController