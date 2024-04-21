const { User, Role } = require("../../DB_conection");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const googleLoginController = async (token) => {
  try {
    const { data } = await axios(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    );
    const { email } = data;
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

    if (!user.status) throw Error("Acceso Denegado");
    if (user) {
      const jwtoken = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          roles: user.Roles,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "12h",
        }
      );
      return { user, jwtoken };
    }
    return { user };
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { googleLoginController };
