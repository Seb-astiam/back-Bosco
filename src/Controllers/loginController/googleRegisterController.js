const { User, Role } = require("../../DB_conection");
const axios = require("axios");

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
    }

    return [user, created];
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { googleRegisterController };
