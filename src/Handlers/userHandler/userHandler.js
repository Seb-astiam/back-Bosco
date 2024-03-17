const {
  createNewuser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../../Controllers/userController/userController");

const postUser = async (req, res) => {
<<<<<<< HEAD
  const { name, email, password ,roleIds } = req.body;
  try {
    if (!name || !email || !password || !roleIds)
=======
  const { name, email, password, province, city, address, phone, balance ,servicesIds} =
    req.body;
  try {
    if (
      !name ||
      !email ||
      !password ||
      !province ||
      !city ||
      !address ||
      !phone ||
      !servicesIds
    )
>>>>>>> 1d3c03ca3c23cf0caa00b00c18feb3ba36bc74e3
      return res.status(400).send("Falta información de registro");
    const newUser = { name, email, password };

<<<<<<< HEAD
    const created = await createNewuser(newUser,roleIds);
=======
    const created = await createNewuser(newUser,servicesIds);
>>>>>>> 1d3c03ca3c23cf0caa00b00c18feb3ba36bc74e3

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
    return res.json(user);
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
  const { name, email, password } = req.body;

  const user = {
    name,
    email,
    password,
  };
  try {
    console.log(email);
    if (!email) return res.status(400).send("El email es requerido");
    const updated = await updateUser(user);
    if (!updated) return res.status(404).send("Usuario no encontrado");
    return res.send("Usuario actualizado exitosamente");
  } catch (error) {
    return res.status(500).send("Error actualizando usuario: " + error.message);
  }
};

module.exports = { postUser, getUsers, getUserId, delUser, updateUserProfile };
