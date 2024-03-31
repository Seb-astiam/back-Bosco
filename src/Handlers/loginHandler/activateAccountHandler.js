const activateAccountController = require("../../Controllers/loginController/activateAccountController");

const activateAccountHandler = async (req, res) => {
  const { token } = req.params;
  //   console.log(token);
  try {
    const activation = await activateAccountController(token);
    if (!activation) return res.status(404).send("Usuario no encontrado");
    return res.send("Usuario activado, ya puedes acceder a tu cuenta");
  } catch (error) {
    if (error.message === "Activado")
      return res.status(400).send("Usuario ya activado");
    res.status(500).send("Error activando cuenta");
  }
};

module.exports = activateAccountHandler;
