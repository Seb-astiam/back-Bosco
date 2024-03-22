const { User } = require("../../DB_conection");
const bcrypt = require("bcrypt");

const loginController = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw Error("No user");

    if (user.googleAccount) throw Error("Google Account");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw Error("Bad Password");

    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { loginController };
