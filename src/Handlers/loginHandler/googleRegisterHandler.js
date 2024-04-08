const {
  googleRegisterController,
} = require("../../Controllers/loginController/googleRegisterController");

const googleRegister = async (req, res) => {
  const { token } = req.body;
  try {
    const [newUser, created, jwtoken] = await googleRegisterController(token);
    if (created) {
      const response = {
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        roles: newUser.Roles,
        id: newUser.id,
        token: jwtoken,
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

module.exports = { googleRegister };
