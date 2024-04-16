const getTypehandler = require("../../Handlers/HousingTypehandler/getTypeHandler");

const getypeController = async (req, res) => {
  

  try {
    

    const response = await getTypehandler();
    return response
      ? res.status(200).json(response)
      : res.status(400).send("No se encontro ningún type");
   
  } catch (error) {
    res.status(500).send("Error encontrando Type: " + error.message);
  }
};
module.exports = getypeController;