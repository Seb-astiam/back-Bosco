const {
  createUserMascotaController,
  getAllUserMascotasController,
  deleteUserMascotaController,
  updateUserMascotaController,
  getUserMascotasController,
} = require("../../Controllers/userMascotaControllers/userMascotaControllers");

const createUserMascotaHandler = async (req, res) => {
  const {
    userId,
    image,
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

  console.log(req.body)

  try {
    if (
      (image, name, type, age, raze, aggressiveness, genre, coexistence, size, UserId)
    ) {
      const responseController = await createUserMascotaController({
        userId,
        image,
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
    res.status(417).send("Error creating product " + error.message);
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
  getUserMascotasHandler
};
