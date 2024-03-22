const {
  loginController,
} = require("../../Controllers/loginController/loginController");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send("Debe ingresar email y contraseña");
    const user = await loginController(email, password);

    return res.status(201).json(user);
  } catch (error) {
    if (error.message === "Google Account")
      return res.status(401).send("Ingrese con el acceso de Google");
    if (error.message === "No user")
      return res
        .status(401)
        .send("No hay usuario registrado con el mail ingresado");
    if (error.message === "Bad Password")
      return res.status(401).send("Contraseña o Usuario incorrecto");

    res.status(500).send("Internal server error");
  }
};

module.exports = { login };
