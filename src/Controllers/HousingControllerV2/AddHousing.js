const addHounsingsHandler = require('../../Handlers/HousinhandlerV2/AddHousingsHandler');
const cloudinary = require('../../Config/cloudinary');
const path = require('path');
const fs = require('fs-extra');
const addhousing = async (req, res) => {
  const { accommodationType, datesAvailable, datesEnd, location, price, services, square, title } = req.body;
  const { email } = req.query;
  const images = req.files;

  try {
    const uploadImage = async (imagePaths) => {
      // Opciones para la carga de imágenes en Cloudinary
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };

      const uploadedImageUrls = [];
      // Iterar sobre cada ruta de imagen en el array
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
    const imagePaths = images.map(image => path.join(__dirname, '../../public/img/upload', image.filename));
    // Subir las imágenes a Cloudinary
    const uploadedImageUrls = await uploadImage(imagePaths);

    // Crear objeto de datos del alojamiento
    const housingData = {
      title,
      datesAvailable,
      datesEnd,
      accommodationType,
      price,
      location,
      square,
      availability: true,
      images: uploadedImageUrls, // Usar las URLs de las imágenes subidas
    };

    // Llamar al manejador para agregar el alojamiento
    await addHounsingsHandler(housingData, email, services);

    res.status(201).json({ message: 'Datos recibidos correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al crear el alojamiento: ${error.message}` });
  }
};

module.exports = addhousing;