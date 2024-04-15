const {
  createUserMascotaController,
  getAllUserMascotasController,
  deleteUserMascotaController,
  updateUserMascotaController,
  getUserMascotasController,
  getMascotaByIdController

} = require("../../Controllers/userMascotaControllers/userMascotaControllers");
const cloudinary = require('../../Config/cloudinary');
const path = require('path');
const fs = require('fs-extra');

const createUserMascotaHandler = async (req, res) => {
  const {
    userId,
    name,
    type,
    age,
    raze,
    aggressiveness,
    genre,
    coexistence,
    size,
    UserId
  } = req.body;

  const images = req.files

  try {
    if (
      (images, name, type, age, raze, aggressiveness, genre, coexistence, size, UserId)
    ) {
      
      const imagePaths = images.map(image => path.join(__dirname, '../../public/img/upload', image.filename));
      const uploadedImageUrls = await uploadImage(imagePaths);
  

      const responseController = await createUserMascotaController({
        userId,
        image:uploadedImageUrls[0],
        name,
        type,
        age,
        raze,
        aggressiveness,
        genre,
        coexistence,
        size,
        UserId
      });
      
      res.status(201).send(responseController);
    } else {
      res.status(400).send("no estan todas las propiedades");
    }
  } catch (error) {
    res.status(417).json({
      error: error.message,
      msg: "Error creating product "
    });
  }
};

const getAllUserMascotasHandler = async (req, res) => {
  const { UserId } = req.params
    
  try {
    if(!UserId) return 'Este usuario no tiene mascotas'
    const userMascotas = await getAllUserMascotasController(UserId);
    res.status(200).json(userMascotas);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener UserMascota: " + error.message });
  }
};
const getUserMascotasHandler = async (req, res) => {
  const {id}=req.params
  try {
    const userMascotas = await getUserMascotasController(id);
    res.status(200).json(userMascotas);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener UserMascota: " + error.message });
  }
};

const deleteUserMascotaHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const mascotaEliminada = await deleteUserMascotaController(id);
    res
      .status(200)
      .json({
        message: "UserMascota eliminado correctamente",
        mascota: mascotaEliminada,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error eliminando el UserMascota: " + error.message });
  }
};

const updateUserMascotaHandler = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const images=req.files
  const imagePaths = images.map(image => path.join(__dirname, '../../public/img/upload', image.filename));
  // Subir las imágenes a Cloudinary
  const uploadedImageUrls = await uploadImage(imagePaths);

  try {
    const mascotaActualizada = await updateUserMascotaController(id, {...newData , image:uploadedImageUrls[0]});
    res
      .status(200)
      .json({
        message: "UserMascota actualizado correctamente",
        mascota: mascotaActualizada,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error actualizando UserMascota: " + error.message });
  }
};


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

const getMascotaByIdHandler = async (req, res) => {
  const { idMascota } = req.params

  if(!idMascota) return "No se proporciono el id para realizar la busqueda"
  try {
    const mascota = await getMascotaByIdController(idMascota);
   return res.status(200).json(mascota);
  } catch (error) {
      return res.status(500).json({error: error.message})
  }
}

module.exports = {
  createUserMascotaHandler,
  getAllUserMascotasHandler,
  deleteUserMascotaHandler,
  updateUserMascotaHandler,
  getUserMascotasHandler,
  getMascotaByIdHandler
};
