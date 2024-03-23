const { User, Role } = require("../../DB_conection");
const bcrypt = require("bcrypt");

// const gamesDb = await Videogame.findAll({
//   attributes: ["id", "name", "background_image", "rating", "userCreated"],
//   include: {
//     model: Genre,
//     as: "genres",
//     attributes: ["id", "name"],
//     through: {
//       attributes: [],
//     },
//   },
// });

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

    if (user.googleAccount) throw Error("Google Account");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw Error("Bad Password");

    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { loginController };
