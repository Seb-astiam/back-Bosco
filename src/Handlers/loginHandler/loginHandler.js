const {
  loginController,
} = require("../../Controllers/loginController/loginController");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send("Debe ingresar email y contraseña");
    const successfulLogin = await loginController(email, password);

    if (!successfulLogin) return res.status(400).send("Contraseña no valida");
    return res.send("Usuario logueado");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports = { login };
