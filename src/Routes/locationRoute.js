const { Router } = require("express");
const {
  getProvinces,
  getCities,
} = require("../Handlers/locationHandler/locationHandler");

const routerLocation = Router();

routerLocation.get("/provinces", getProvinces);
routerLocation.get("/cities", getCities);

module.exports = routerLocation;
