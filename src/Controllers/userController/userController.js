const { User } = require("../../Models/User");

const createNewuser = async (user) => {
  const { name, email, password, province, city, address, phone, balance } =
    user;

  const defaults = {
    name,
    password,
    province,
    city,
    address,
    phone,
  };
  if (balance) defaults.balance = balance;

  try {
    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults,
    });
    return created;
  } catch (error) {
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

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

const deleteUser = async () => {};

const updateUser = async () => {};

module.exports = {
  createNewuser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
