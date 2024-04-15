const userAdminHandlers = require("../../Handlers/userAdminHandlers/userAdminHandlers");

const userAdiminController = async (req, res) => {
  const { name, email, password,  selectedRoleId} = req.body;
  console.log(req.body);
  if(!name || !email || !password || !selectedRoleId ){
   return res.status(403).send("faltan datos " )
  }
  try {
    const result = await userAdminHandlers(name, email, password,  selectedRoleId);

    if (result.success) {
      return res.status(201).send(result.message);
    } else {
      return res.status(400).send(result.message);
    }
  } catch (error) {
    console.error("Error en el controlador de usuario admin:", error.message);
    return res.status(500).send("Error interno del servidor: " + error.message);
  }
};

module.exports = userAdiminController;
