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

const deleteUser = async (id) => {
  try {
    const deleted = await User.destroy({ where: { id } });
    return deleted;
  } catch (error) {
    throw Error(error.message);
  }
};

const updateUser = async (user) => {
  const {
    name,
    email,
    password,
    province,
    city,
    address,
    phone,
    balance,
    housingProfile,
    petProfile,
  } = user;
  try {
    const updatedUser = await User.findOne({ where: { email } });
    if (!updatedUser) return false;

    let attributes = {};
    if (name) attributes = { ...attributes, name };
    if (password) attributes = { ...attributes, password };
    if (province) attributes = { ...attributes, province };
    if (city) attributes = { ...attributes, city };
    if (address) attributes = { ...attributes, address };
    if (phone) attributes = { ...attributes, phone };
    if (balance) attributes = { ...attributes, balance };
    if (housingProfile) attributes = { ...attributes, housingProfile };
    if (petProfile) attributes = { ...attributes, petProfile };

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
  getUserById,
  deleteUser,
  updateUser,
};
