const { Router } = require("express");
const { getAllReservesHandler, postReserveHandler } = require("../Handlers/reserveHandler/reserveHandler");

routerReserve = Router();

routerReserve.get("/allReserves", getAllReservesHandler );

routerReserve.post("/newReserve", postReserveHandler);

module.exports = {routerReserve};