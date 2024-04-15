const { Router } = require("express");
const {  getAllReservationHandler, postReservationHandler, updateReservationHandler, getReservationsAlojamientoHandler } = require("../Handlers/reservationHandler/reservationHandler");
const reservationFilter = require("../Controllers/reservationController/reservationFilter");

routerReservation = Router();

routerReservation.get("/allReservation/:id", getAllReservationHandler);

routerReservation.get("/reservations/:identificacion", getReservationsAlojamientoHandler)

routerReservation.post("/newReservation", postReservationHandler);

routerReservation.put("/estadoReserva", updateReservationHandler);

routerReservation.get("/filtered", reservationFilter);


module.exports = { routerReservation };