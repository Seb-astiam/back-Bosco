const {
  facebookRegisterController,
} = require("../../Controllers/loginController/facebookRegisterController");

const facebookRegister = async (req, res) => {
  const { token, userId } = req.body;
  try {
    const [newUser, created] = await facebookRegisterController(token, userId);
    if (created) {
      const response = {
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        roles: newUser.Roles,
      };
      return res.status(201).json(response);
    } else {
      return res.status(400).send("Ya existe un usuario con el mail ingresado");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creando usuario: " + error.message);
  }
};

module.exports = { facebookRegister };