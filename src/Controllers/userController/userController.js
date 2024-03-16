const { User, Service } = require("../../DB_conection");

const createNewuser = async (user,servicesIds) => {
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
    console.log("user creado");
    console.log("created" + created);
    console.log("service" + servicesIds);
    if (created && servicesIds) {
      console.log("creando");
      const services = await Service.findAll({ where: { id: servicesIds } });
      console.log(services);
      await newUser.addServices(services);
    }
    return created;
  } catch (error) {
    console.log(error);
    throw Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll(
      {
        include: {
          model: Service,
          attributes: { exclude: ['userServices'] },
        },
      }
    );
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
