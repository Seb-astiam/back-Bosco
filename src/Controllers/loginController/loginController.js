const { User } = require("../../DB_conection");
const bcrypt = require("bcrypt");

const loginController = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw Error("No hay usuario registrado con el mail ingresado");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { loginController };
