const {
  createNewProfile,
  getProfileByUserId,
  deleteProfile,
  updateProfile,
} = require("../../Controllers/profileController/profileController");

const postUserProfile = async (req, res) => {
  const {name ,surname ,genre, userId, province, city, address, phone, balance } = req.body;
  console.log(req.body);
  try {
    if (!userId || !province || !city || !address || !phone)
      return res.status(400).send("Falta información de registro de perfil");
    const newProfile = { name ,surname ,genre,userId, province, city, address, phone };
    if (balance) newProfile.balance = balance;
    await createNewProfile(newProfile);
    return res.status(201).send("Perfil creado exitosamente");
  } catch (error) {
    res.status(500).send("Error creando perfil: " + error.message);
  }
};

const getUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await getProfileByUserId(userId);
    if (!profile) return res.status(404).send("Perfil no encontrado");
    return res.json(profile);
  } catch (error) {
    res.status(500).send("Error buscando perfil: " + error.message);
  }
};

const delUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    await deleteProfile(userId);
    return res.send("Perfil borrado exitosamente");
  } catch (error) {
    res.status(500).send("Error borrando perfil: " + error.message);
  }
};

const updateUserProfile = async (req, res) => {
  const {
    userId,
    password,
    province,
    city,
    address,
    phone,
    balance,
    housingProfile,
    petProfile,
  } = req.body;

  const profile = {
    userId,
    password,
    province,
    city,
    address,
    phone,
    balance,
    housingProfile,
    petProfile,
  };
  try {
    await updateProfile(profile);

    return res.send("Perfil actualizado exitosamente");
  } catch (error) {
    return res.status(500).send("Error actualizando Perfil: " + error.message);
  }
};

module.exports = {
  postUserProfile,
  getUserProfile,
  delUserProfile,
  updateUserProfile,
};
