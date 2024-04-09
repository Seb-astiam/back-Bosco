const {
  createNewuser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserByEmail,
  blockAccountController,
  updatePictureController
} = require("../../Controllers/userController/userController");
const cloudinary = require('../../Config/cloudinary');
const path = require('path');
const fs = require('fs-extra');
const { User } = require("../../DB_conection");

const postUser = async (req, res) => {
  const { name, email, password, picture } = req.body;

  try {
    if (!name || !email || !password)
      return res.status(400).send("Falta información de registro");
    const createUser = { name, email, password, picture };

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
    return res.json(user.picture); // Devolver solo el campo 'picture'
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

const blockAccountHandler = async (req, res) => {
  const { block, email } = req.body

  try {
      const blockAccount = await blockAccountController(block, email);
      return res.status(200).send(blockAccount)

  } catch (error) {
    return res.status(500).json({error: error})
  }
}
const updatePictureProfile = async (req, res) => {
  const { email } = req.query;
  console.log(req.body);
  const picture = req.files;
  console.log("picture back");
  console.log(picture);

  try {
    const uploadImage = async (imagePaths) => {
      // Opciones para la carga de imágenes en Cloudinary
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };

      const uploadedImageUrls = [];
      for (const imagePath of imagePaths) {
        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(imagePath, options);
        
        // Almacenar la URL de la imagen subida
        uploadedImageUrls.push(result.secure_url);
        // Eliminar el archivo local después de subirlo a Cloudinary
        await fs.unlink(imagePath);
      }
      // Devolver las URLs de las imágenes subidas
      return uploadedImageUrls;
    };

    // Obtener las rutas de las imágenes
    const imagePaths = picture.map(image => path.join(__dirname, '../../public/img/upload', image.filename));
    // Subir las imágenes a Cloudinary
    const uploadedImageUrls = await uploadImage(imagePaths);

    // Crear objeto de datos del alojamiento
    const userData = {
      picture: uploadedImageUrls, // Usar las URLs de las imágenes subidas
    };
    console.log("backend");
    console.log(userData);
    // Llamar al manejador para agregar el alojamiento
    await updatePictureController(userData, email);

    res.status(201).json({ message: 'Datos recibidos correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al crear el alojamiento: ${error.message}` });
  }
};
module.exports = {
  postUser,
  getUsers,
  getUserEmail,
  delUser,
  updateUserProfile,
  blockAccountHandler,
  updatePictureProfile
};
