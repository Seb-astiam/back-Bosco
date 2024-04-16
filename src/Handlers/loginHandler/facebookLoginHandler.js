const {
  facebookLoginController,
} = require("../../Controllers/loginController/facebookLoginController");

const facebookLogin = async (req, res) => {
  const { token, userId } = req.body;
  try {
    const { user, jwtoken } = await facebookLoginController(token, userId);
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
    return res.status(500).send(error.message);
  }
};

module.exports = { facebookLogin };
