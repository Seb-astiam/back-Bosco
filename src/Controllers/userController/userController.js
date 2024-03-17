<<<<<<< HEAD
const { User, Role } = require("../../DB_conection");
const bcrypt = require("bcrypt");

const createNewuser = async (user,roleIds) => {
  const { name, email, password } = user;
=======
const { User, Service } = require("../../DB_conection");

const createNewuser = async (user,servicesIds) => {
  const { name, email, password, province, city, address, phone, balance } =
    user;
>>>>>>> 1d3c03ca3c23cf0caa00b00c18feb3ba36bc74e3

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
<<<<<<< HEAD
    if (created && roleIds) {
      console.log("creando");
      const roles = await Role.findAll({ where: { id: roleIds } });
      await newUser.addRoles(roles);
=======
    console.log("user creado");
    console.log("created" + created);
    console.log("service" + servicesIds);
    if (created && servicesIds) {
      console.log("creando");
      const services = await Service.findAll({ where: { id: servicesIds } });
      console.log(services);
      await newUser.addServices(services);
>>>>>>> 1d3c03ca3c23cf0caa00b00c18feb3ba36bc74e3
    }
    return created;
  } catch (error) {
    throw Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll(
      {
        include: {
<<<<<<< HEAD
          model: Role,
=======
          model: Service,
          attributes: { exclude: ['userServices'] },
>>>>>>> 1d3c03ca3c23cf0caa00b00c18feb3ba36bc74e3
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
  getUserById,
  deleteUser,
  updateUser,
};
