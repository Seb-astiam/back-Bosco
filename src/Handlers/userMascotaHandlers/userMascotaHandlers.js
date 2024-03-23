const {
  createUserMascotaController,
  getAllUserMascotasController,
  deleteUserMascotaController,
  updateUserMascotaController,
} = require("../../Controllers/userMascotaControllers/userMascotaControllers");

const createUserMascotaHandler = async (req, res) => {
  const {
    image,
    name,
    type,
    age,
    raze,
    aggressiveness,
    genre,
    coexistence,
    size,
  } = req.body;

  try {
    if (
      (image, name, type, age, raze, aggressiveness, genre, coexistence, size)
    ) {
      const responseController = await createUserMascotaController({
        image,
        name,
        type,
        age,
        raze,
        aggressiveness,
        genre,
        coexistence,
        size,
      });
      res.status(201).json(responseController);
    } else {
      res.status(400).send("no estan todas las propiedades");
    }
  } catch (error) {
    res.status(417).send("Error creating product " + error.message);
  }
};

const getAllUserMascotasHandler = async (req, res) => {
  try {
    const userMascotas = await getAllUserMascotasController();
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
  try {
    const mascotaActualizada = await updateUserMascotaController(id, newData);
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

module.exports = {
  createUserMascotaHandler,
  getAllUserMascotasHandler,
  deleteUserMascotaHandler,
  updateUserMascotaHandler,
};
