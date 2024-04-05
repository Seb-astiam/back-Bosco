const resetPasswordController = require("../../Controllers/loginController/resetPasswordController");

const resetPassword = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await resetPasswordController(email);
    if (!result) return res.status(404).send("Usuario no encontrado");
    return res.send("Password restablecido. Chequee su email");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports = { resetPassword };
