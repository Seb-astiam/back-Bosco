const { User, Role } = require("../../DB_conection");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const googleRegisterController = async (token) => {
  try {
    const { data } = await axios(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    );

    const { name, picture, email } = data;

    const defaults = {
      name,
      picture,
      password: "thisisagoogleaccount",
      googleAccount: true,
    };

    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults,
    });
    if (created) {
      await newUser.addRoles(1);
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

module.exports = { googleRegisterController };
