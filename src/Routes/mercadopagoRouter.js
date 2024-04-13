const express = require("express");
const { createPreference } = require("../Handlers/mercadopagoHandler/mercadopagoHandler")
const routerMercadoPago = express.Router();

// Ruta para crear una preferencia en MercadoPago
routerMercadoPago.post("/create_preference", createPreference);

module.exports = routerMercadoPago;
