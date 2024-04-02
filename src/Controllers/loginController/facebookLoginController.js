const { User, Role, UserMascota } = require("../../DB_conection");
const axios = require("axios");

const facebookLoginController = async (token, userId) => {
  try {
    const { data } = await axios(
      `https://graph.facebook.com/${userId}?fields=id,name,email,picture&access_token=${token}`
    );
    const { email } = data;
    const user = await User.findOne({
      where: { email },
      include: 
        {
          model: Role,
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        }
    });
    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { facebookLoginController };
