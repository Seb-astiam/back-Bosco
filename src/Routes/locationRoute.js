const { Router } = require("express");
const { getProvinces } = require("../Handlers/locationHandler/locationHandler");

const routerLocation = Router();

routerLocation.get("/provinces", getProvinces);

module.exports = routerLocation;
