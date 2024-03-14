const {
  getProvincesList,
} = require("../../Controllers/locationController/locationController");

const getProvinces = async (req, res) => {
  try {
    const provinces = await getProvincesList();

    return res.json(provinces);
  } catch (error) {
    res.status(500).send("Error buscando provincias: " + error.message);
  }
};

module.exports = { getProvinces };
