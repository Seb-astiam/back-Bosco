const {
  createNewuser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../../Controllers/userController/userController");

const postUser = async (req, res) => {
  const { name, email, password, province, city, address, phone, balance } =
    req.body;
  try {
    if (
      !name ||
      !email ||
      !password ||
      !province ||
      !city ||
      !address ||
      !phone
    )
      return res.status(400).send("Falta información de registro");
    const newUser = { name, email, password, province, city, address, phone };
    if (balance) newUser.balance = balance;

    const created = await createNewuser(newUser);

    if (created) {
      return res.status(201).send("Usuario creado exitosamente");
    } else {
      return res.status(400).send("Ya existe un usuario con el mail ingresado");
    }
  } catch (error) {
    res.status(500).send("Error creando usuario: " + error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    if (users.length < 1)
      return res.status(404).send("No se encontraron usuarios");

    return res.json(users);
  } catch (error) {
    res.status(500).send("Error buscando usuarios: " + error.message);
  }
};

const getUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) return res.status(404).send("Usuario no encontrado");
  } catch (error) {
    res.status(500).send("Error buscando usuario: " + error.message);
  }
};

const delUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteUser(id);
    if (deleted === 0) return res.status(404).send("Id no valida");
    return res.send("Usuario borrado exitosamente");
  } catch (error) {
    res.status(500).send("Error borrando usuario: " + error.message);
  }
};

const updateUserProfile = async (req, res) => {
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
  } = req.params;

  const user = {
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
  };
  try {
    if (!email) return res.status(400).send("El email es requerido");
    const updated = await updateUser(user);
    if (!updated) return res.status(404).send("Usuario no encontrado");
    return res.send("Usuario actualizado exitosamente");
  } catch (error) {
    return res.status(500).send("Error actualizando usuario: " + error.message);
  }
};

module.exports = { postUser, getUsers, getUserId, delUser, updateUserProfile };
