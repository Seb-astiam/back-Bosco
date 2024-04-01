
const UpdateHosingsHandler = require('../../Handlers/HousinhandlerV2/UpdateHosingsHandler');
const cloudinary = require('../../Config/cloudinary');
const path = require('path');
const fs = require('fs-extra');

// const  updateHousing  = async (req, res) => {
//   const { accommodationType, datesAvailable, datesEnd, location, price, services, square, title } = req.body;
//   const { email } = req.query;
//   const images = req.files;
// console.log(req.body)
//   try {
//     const uploadImage = async (imagePaths) => {
//       // Opciones para la carga de imágenes en Cloudinary
//       const options = {
//         use_filename: true,
//         unique_filename: false,
//         overwrite: true,
//       };

//       const uploadedImageUrls = [];
//       // Iterar sobre cada ruta de imagen en el array
//       for (const imagePath of imagePaths) {
//         // Subir la imagen a Cloudinary
//         const result = await cloudinary.uploader.upload(imagePath, options);
        
//         // Almacenar la URL de la imagen subida
//         uploadedImageUrls.push(result.secure_url);
//         // Eliminar el archivo local después de subirlo a Cloudinary
//         await fs.unlink(imagePath);
//       }
//       // Devolver las URLs de las imágenes subidas
//       return uploadedImageUrls;
//     };

//     // Obtener las rutas de las imágenes
//     const imagePaths = images.map(image => path.join(__dirname, '../../public/img/upload', image.filename));
//     // Subir las imágenes a Cloudinary
//     const uploadedImageUrls = await uploadImage(imagePaths);

//     // Crear objeto de datos del alojamiento
//     const housingData = {
//       title,
//       datesAvailable,
//       datesEnd,
//       accommodationType,
//       price,
//       location,
//       square,
//       availability: true,
//       images: uploadedImageUrls, // Usar las URLs de las imágenes subidas
//     };

//     // Llamar al manejador para agregar el alojamiento
//     await UpdateHosingsHandler(housingData, email, services);

//     res.status(201).json({ message: 'Datos recibidos correctamente' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: `Error al crear el alojamiento: ${error.message}` });
//   }
// };
const updateHousing = async (req, res) => {
    const { accommodationType, datesAvailable, datesEnd, location, price, services, square, title } = req.body;
    console.log( 'rsto lo tare desde el bodu',req.body)
    const { id } = req.params;
     const images= req.files
    console.log('id', id);
    console.log('datos', accommodationType, datesAvailable, datesEnd, location, price, services, square, title );
    console.log('images', images);

    if (!accommodationType || !datesAvailable || !datesEnd || !location || !price || !services || !square || !title) {
        console.log('Faltan datos obligatorios');
        res.status(400).json({ error: 'Faltan datos obligatorios' });
        return;
    }

    try {
        if (images && images.length > 0) {
            const uploadImage = async (imagePaths) => {
                const options = {
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true,
                };

                const uploadedImageUrls = [];
                for (const imagePath of imagePaths) {
                    const result = await cloudinary.uploader.upload(imagePath, options);
                    uploadedImageUrls.push(result.secure_url);
                    await fs.unlink(imagePath); // Eliminar el archivo local después de subirlo a Cloudinary
                }
                return uploadedImageUrls;
            };

            const imagePaths = images.map(image => {
                if (typeof image === 'string') {
                    return image; // Si es una URL, no es necesario subirlo a Cloudinary
                } else {
                    return path.join(__dirname, '../../public/img/upload', image.filename);
                }
            });

            const uploadedImageUrls = await uploadImage(imagePaths);

            // Actualizar el alojamiento con las nuevas imágenes
            const housingData = {
                title,
                datesAvailable,
                datesEnd,
                accommodationType,
                price,
                location,
                square,
                availability: true,
                images: uploadedImageUrls,
            };

            await UpdateHosingsHandler(housingData, services, id);
        } else {
            // Si no hay imágenes nuevas, simplemente actualizar los datos del alojamiento
            const housingData = {
                title,
                datesAvailable,
                datesEnd,
                accommodationType,
                price,
                location,
                square,
                availability: true,
            };

            await UpdateHosingsHandler(housingData, services, id);
        }

        res.status(200).json({ message: 'Datos actualizados correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error al actualizar el alojamiento: ${error.message}` });
    }
};

module.exports = updateHousing;



