const { User, Role } = require("../../DB_conection");
const bcrypt = require("bcrypt");

const createNewuser = async (user) => {
  const { name, email, password, picture } = user;

  const hashedPassword = await bcrypt.hash(password, 10);
  const defaults = {
    name,
    picture,
    password: hashedPassword,
  };

  try {
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
    console.log(error);
    throw Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: ["name", "email", "picture"],
      include: {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });
    return users;
  } catch (error) {
    throw Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
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
    return user;
  } catch (error) {
    throw Error(error.message);
  }
};
// const getUserById = async (id) => {
//   try {
//     const user = await User.findByPk(id);
//     return user;
//   } catch (error) {
//     throw Error(error.message);
//   }
// };

const deleteUser = async (email) => {
  try {
    const deleted = await User.destroy({ where: { email } });
    return deleted;
  } catch (error) {
    throw Error(error.message);
  }
};

const updateUser = async (user) => {
  const { name, email, password, picture } = user;
  try {
    const updatedUser = await User.findOne({ where: { email } });
    if (!updatedUser) return false;

    let attributes = {};
    if (name) attributes = { ...attributes, name };
    if (picture) attributes = { ...attributes, picture };
    if (password) attributes = { ...attributes, password };

    await updatedUser.update(attributes, {
      where: { email },
      fields: Object.keys(attributes),
    });

    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  createNewuser,
  getAllUsers,
  getUserByEmail,
  deleteUser,
  updateUser,
};
