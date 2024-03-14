const {
  getProvincesList,
  getCityList,
} = require("../../Controllers/locationController/locationController");

const getProvinces = async (req, res) => {
  try {
    const provinces = await getProvincesList();

    return res.json(provinces);
  } catch (error) {
    res.status(500).send("Error buscando provincias: " + error.message);
  }
};

const getCities = async (req, res) => {
  const { provincia, busqueda } = req.query;
  try {
    if (!provincia)
      return res.status(400).send("Debe especificar una provincia");
    const cities = await getCityList(provincia, busqueda);

    if (cities.length < 1)
      return res.status(404).send("No se encontro ninguna ciudad");

    return res.json(cities);
  } catch (error) {
    res.status(500).send("Error buscando ciudades: " + error.messages);
  }
};
module.exports = { getProvinces, getCities };
