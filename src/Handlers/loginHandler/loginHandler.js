const {
  loginController,
} = require("../../Controllers/loginController/loginController");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send("Debe ingresar email y contraseña");
    const user = await loginController(email, password);
    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      roles: user.Roles,
    };

    return res.status(200).json(response);
  } catch (error) {
    if(error.message === "Acceso Denegado") 
    return res.status(400).send("Acceso Denegado")
    if (error.message === "Google Account")
      return res.status(401).send("Ingrese con el acceso de Google");
    if (error.message === "Facebook Account")
      return res.status(401).send("Ingrese con el acceso de Facebook");
    if (error.message === "No user")
      return res
        .status(401)
        .send("No hay usuario registrado con el mail ingresado");
    if (error.message === "Bad Password")
      return res.status(401).send("Contraseña o Usuario incorrecto");
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { login };
