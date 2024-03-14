const axios = require("axios");
const URL = "https://apis.datos.gob.ar/georef/api/";

const getProvincesList = async () => {
  try {
    const { data } = await axios(`${URL}provincias?campos=id,nombre`);
    const { provincias } = data;
    return provincias;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { getProvincesList };
