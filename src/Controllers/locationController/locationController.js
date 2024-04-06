const axios = require("axios");
const URL = "https://apis.datos.gob.ar/georef/api/";

const getProvincesList = async () => {
  try {
    const { data } = await axios(
      `${URL}provincias?orden=nombre&campos=id,nombre`
    );
    const { provincias } = data;
    return provincias;
  } catch (error) {
    throw Error(error.message);
  }
};

const getCityList = async (province, searchTerm) => {
  try {
    if (searchTerm) {
      const { data } = await axios(
        `${URL}localidades?provincia=${province}&orden=nombre&campos=id,nombre&max=1000&nombre=${searchTerm}`
      );
      const cities = data.localidades;
      return cities;
    } else {
      const { data } = await axios(
        `${URL}localidades?provincia=${province}&campos=id,nombre&max=1000&orden=nombre`
      );
      const cities = data.localidades;
      return cities;
    }
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { getProvincesList, getCityList };
