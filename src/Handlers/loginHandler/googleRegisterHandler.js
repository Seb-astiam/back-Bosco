const {
  googleRegisterController,
} = require("../../Controllers/loginController/googleRegisterController");

const googleRegister = async (req, res) => {
  const { token } = req.body;
  try {
    const created = await googleRegisterController(token);
    if (created) {
      return res.status(201).send("Usuario creado exitosamente");
    } else {
      return res.status(400).send("Ya existe un usuario con el mail ingresado");
    }
  } catch (error) {
    res.status(500).send("Error creando usuario: " + error.message);
  }
};

module.exports = { googleRegister };
