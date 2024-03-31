const { Router } = require("express");

const { postReserveHandler, getReserve } = require("../Handlers/postReserveHandler/postReserveHandler");

    const routerReservation = Router();

    routerReservation.post("/create", postReserveHandler);

    routerReservation.get("/:id", getReserve);
    

    module.exports = {routerReservation};