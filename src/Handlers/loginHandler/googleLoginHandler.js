const {
  googleLoginController,
} = require("../../Controllers/loginController/googleLoginController");

const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await googleLoginController(token);
    if (!user) return res.status(401).send("Usuario no registrado");
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { googleLogin };
