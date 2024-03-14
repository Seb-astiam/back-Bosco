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

const getCityList = async (province, name) => {
  try {
    if (name) {
      const { data } = await axios(
        `${URL}/localidades?provincia=${province}&campos=id,nombre&max=1000&nombre=${name}`
      );
      const cities = data.localidades;
      return cities;
    } else {
      const { data } = await axios(
        `${URL}/localidades?provincia=${province}&campos=id,nombre&max=1000`
      );
      const cities = data.localidades;
      return cities;
    }
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { getProvincesList, getCityList };
