const addHounsingsHandler = require('../../Handlers/HousinhandlerV2/AddHousingsHandler');

const addhousing = async (req, res) => {
  const { accommodationType, datesAvailable, datesEnd, location, price, services, square, title } = req.body;
  const { email } = req.query;
  const images = req.files;

  try {
    const housingData = {
      title,
      datesAvailable,
      datesEnd,
      accommodationType, // Renombramos accommodationType a type para que coincida 
      price,
      location,
      square,
      availability: true, //  que por defecto la disponibilidad es verdadera
      images: images.map(image => `/uploads/${image.filename}`), // ruta de cada imagen
    };

   
    await addHounsingsHandler(housingData, email,services);

    res.status(201).json({ message: 'Datos recibidos correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al crear la Actividad: ${error.message}` });
  }
};

module.exports = addhousing;
