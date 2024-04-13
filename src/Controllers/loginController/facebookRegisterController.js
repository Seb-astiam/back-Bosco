const { User, Role } = require("../../DB_conection");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const facebookRegisterController = async (token, userId) => {
  try {
    const { data } = await axios(
      `https://graph.facebook.com/${userId}?fields=id,name,email,picture&access_token=${token}`
    );

    const { name, email } = data;
    const picture = data.picture.data.url;

    const defaults = {
      name,
      picture,
      password: "thisisafacebookaccount",
      facebookAccount: true,
    };

    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults,
    });
    if (created) {
      const [roles, creado] = await Role.findOrCreate({
        where: { name: "usuario" },
      });
      await newUser.addRoles(roles);
      var user = await User.findOne({
        where: { email },
        include: {
          model: Role,
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      });
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
      return [user, created, jwtoken];
    }

    return [user, created];
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { facebookRegisterController };
