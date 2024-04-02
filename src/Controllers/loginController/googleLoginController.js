const { User, Role, UserMascota } = require("../../DB_conection");
const axios = require("axios");

const googleLoginController = async (token) => {
  try {
    const { data } = await axios(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
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

module.exports = { googleLoginController };
