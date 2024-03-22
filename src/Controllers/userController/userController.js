const { User } = require("../../DB_conection");
const bcrypt = require("bcrypt");

const createNewuser = async (user) => {
  const { name, email, password } = user;

  const hashedPassword = await bcrypt.hash(password, 10);
  const defaults = {
    name,
    password: hashedPassword,
  };

  try {
    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults,
    });
    return created;
  } catch (error) {
    console.log(error);
    throw Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
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

const deleteUser = async (id) => {
  try {
    const deleted = await User.destroy({ where: { id } });
    return deleted;
  } catch (error) {
    throw Error(error.message);
  }
};

const updateUser = async (user) => {
  const { name, email, password } = user;
  try {
    const updatedUser = await User.findOne({ where: { email } });
    if (!updatedUser) return false;

    let attributes = {};
    if (name) attributes = { ...attributes, name };
    if (password) attributes = { ...attributes, password };

    await updatedUser.update(attributes, {
      where: { name },
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
