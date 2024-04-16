const {
  facebookRegisterController,
} = require("../../Controllers/loginController/facebookRegisterController");

const facebookRegister = async (req, res) => {
  const { token, userId } = req.body;
  try {
    const [newUser, created, jwtoken] = await facebookRegisterController(
      token,
      userId
    );
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
    res.status(500).send(error.message);
  }
};

module.exports = { facebookRegister };
