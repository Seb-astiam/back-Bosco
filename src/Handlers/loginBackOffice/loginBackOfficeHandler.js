const { loginBackOfficeController } = require("../../Controllers/loginBackOffice/loginBackOfficeController");
  
  const loginBackOfficeHandler = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).send("Debe ingresar email y contraseña");

      const successfulLogin = await loginBackOfficeController(email, password);

      if (!successfulLogin) return res.status(401).send("Acceso denegado");

      return res.status(200).send("Usuario logueado");

    } catch (error) {
      res.status(500).json({error: error.messages});
    }
  };
  
  module.exports = { loginBackOfficeHandler };