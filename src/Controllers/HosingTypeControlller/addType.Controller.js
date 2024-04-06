const addTypeHandler = require("../../Handlers/HousingTypehandler/addTypeHandler");

const addTypeController = async (req, res) => {
  const { type } = req.body;

  try {
    if (!type) {
      throw new Error("faltan datos");
    }

    const created = await addTypeHandler(type);
    return created
      ? res.status(201).send("type is created")
      : res.status(400).send("Already Type in home");
   
  } catch (error) {
    res.status(500).send("Error creando servicio: " + error.message);
  }
};
module.exports = addTypeController;
// const getAllServicesHandler = async (req, res) => {

//   try {

//     const service = await getServices();

//     if (service.length < 1) {
//       return res.status(400).send("No se encontro ningún servicio");
//     } else {
//       return res.json(service);
//     }
//   } catch (error) {
//     res.status(500).send("Error buscando servicio: " + error.message);
//   }
// };
// const deleteServiceHandler = async (req, res) => {
//   const { id } = req.params
//   try {

//     const servicioElimado = await deleteService(id);

//     res.status(200).json({
//       message: "Servicio eliminado correctamente",
//     });
//   } catch (error) {
//     res.status(500).send("Error eliminando servicio: " + error.message);
//   }
// };

// const updateServiceHandler = async (req, res) => {
//   const { id } = req.params
//   const newService = req.body
//   try {

//     const servicioActualizado = await updateService(id, newService);

//     res.status(200).json({
//       message: "Servicio actualizado correctamente",
//     });

//   } catch (error) {
//     res.status(500).send("Error actualizando servicio: " + error.message);
//   }
// };
// module.exports = { postServiceHandler, getAllServicesHandler ,updateServiceHandler,deleteServiceHandler};
