const { User } = require("../../Models/User");

const createNewuser = async (user) => {
  const { name, email, password, address, phone, balance } = user;

  const defaults = {
    name,
    password,
    address,
    phone,
    balance,
  };
  const [newUser, created] = await User.findOrCreate({
    where: { email },
    defaults,
  });
};

const getAllUsers = async () => {};

const getUserById = async (id) => {};

const deleteUser = async () => {};

const updateUser = async () => {};

module.exports = {
  createNewuser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
