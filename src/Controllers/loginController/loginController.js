const { User, Role, UserMascota } = require("../../DB_conection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (email, password) => {
  try {
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });

    if (!user) throw Error("No user");
    if (!user.status) throw Error("Acceso Denegado");
    if (user.googleAccount) throw Error("Google Account");
    if (user.facebookAccount) throw Error("Facebook Account");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw Error("Bad Password");

    const jwtoken = jwt.sign({ email }, process.env.PRIVATE_KEY, {
      expiresIn: "12h",
    });
    return { user, jwtoken };
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { loginController };
