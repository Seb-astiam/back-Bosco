const {
  facebookLoginController,
} = require("../../Controllers/loginController/facebookLoginController");

const facebookLogin = async (req, res) => {
  const { token, userId } = req.body;
  try {
    const user = await facebookLoginController(token, userId);
    if (!user) return res.status(401).send("Usuario no registrado");
    const { name, email, picture, id } = user;

    const response = { name, email, picture, roles: user.Roles, id };
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { facebookLogin };
