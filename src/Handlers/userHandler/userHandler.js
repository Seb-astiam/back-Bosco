const {
  createNewuser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserByEmail,
} = require("../../Controllers/userController/userController");

const postUser = async (req, res) => {
  const { name, email, password, role, picture } = req.body;

  try {
    if (!name || !email || !password || !role)
      return res.status(400).send("Falta información de registro");
    const createUser = { name, email, password, role, picture, picture };

    const [newUser, created] = await createNewuser(createUser);

    if (created) {
      const response = {
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        roles: newUser.Roles,
      };
      return res.status(201).json(response);
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

const getUserEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).send("Usuario no encontrado");
    return res.json(user);
  } catch (error) {
    res.status(500).send("Error buscando usuario: " + error.message);
  }
};
// const getUserId = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await getUserById(id);
//     if (!user) return res.status(404).send("Usuario no encontrado");
//     return res.json(user);
//   } catch (error) {
//     res.status(500).send("Error buscando usuario: " + error.message);
//   }
// };

const delUser = async (req, res) => {
  const { email } = req.params;
  try {
    const deleted = await deleteUser(email);
    if (deleted === 0) return res.status(404).send("Id no valida");
    return res.send("Usuario borrado exitosamente");
  } catch (error) {
    res.status(500).send("Error borrando usuario: " + error.message);
  }
};

const updateUserProfile = async (req, res) => {
  const { name, email, password, picture } = req.body;

  const user = {
    name,
    email,
    password,
    picture,
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

module.exports = {
  postUser,
  getUsers,
  getUserEmail,
  delUser,
  updateUserProfile,
};
