const {
  googleLoginController,
} = require("../../Controllers/loginController/googleLoginController");

const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await googleLoginController(token);
    if (!user) return res.status(401).send("Usuario no registrado");
<<<<<<< HEAD
    const { name, email, picture } = user;

    const response = { name, email, picture, roles: user.Roles };
    return res.status(201).json(response);
=======
    return res.status(201).json(user);
>>>>>>> 9ebe548 (handler controller googlelogin guille)
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { googleLogin };
