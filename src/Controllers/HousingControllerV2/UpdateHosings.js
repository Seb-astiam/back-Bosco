
const UpdateHosingsHandler = require('../../Handlers/HousinhandlerV2/UpdateHosingsHandler');
const cloudinary = require('../../Config/cloudinary');
const path = require('path');
const fs = require('fs-extra');


const updateHousing = async (req, res) => {
    const { accommodationType, datesAvailable, datesEnd, provinces,cities, price, services, square, title } = req.body;
    console.log( 'rsto lo tare desde el bodu',req.body)
    const { id } = req.params;
     const images= req.files
    console.log('id', id);
    
    console.log('images', images);

    if (!accommodationType || !datesAvailable || !datesEnd ||  !price || !services || !square || !title) {
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
                provinces,
                cities,
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
                provinces,
                cities,
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



