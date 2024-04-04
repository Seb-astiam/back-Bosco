const { User, Role } = require("../../DB_conection");
const axios = require("axios");

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
      await newUser.addRoles(1);
      var user = await User.findOne({
        where: { email },
        attributes: ["name", "email", "picture"],
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

module.exports = { facebookRegisterController };
