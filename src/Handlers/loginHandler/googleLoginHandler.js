const {
  googleLoginController,
} = require("../../Controllers/loginController/googleLoginController");

const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const { user, jwtoken } = await googleLoginController(token);
    if (!user) return res.status(401).send("Usuario no registrado");

    const response = {
      name: user.name,
      email: user.email,
      picture: user.picture,
      roles: user.Roles,
      id: user.id,
      token: jwtoken,
    };
    return res.status(201).json(response);
  } catch (error) {
    if (error.message === "Acceso Denegado") return res.status(400).send("Acceso Denegado");
    return res.status(500).send(error.message);
  }
};

module.exports = { googleLogin };
