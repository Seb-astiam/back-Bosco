const { Router } = require("express");
const {  getAllReservationHandler, postReservationHandler, updateReservationHandler, getReservationsAlojamientoHandler, updateEstadoPagoHandler } = require("../Handlers/reservationHandler/reservationHandler");
const reservationFilter = require("../Handlers/reservationHandler/reservationFilter");

routerReservation = Router();

routerReservation.get("/allReservation/:id", getAllReservationHandler);

routerReservation.get("/reservations/:identificacion", getReservationsAlojamientoHandler)

routerReservation.post("/newReservation", postReservationHandler);

routerReservation.put("/estadoReserva", updateReservationHandler);

routerReservation.put("/estadoPago", updateEstadoPagoHandler);

routerReservation.get("/filtered", reservationFilter);


module.exports = { routerReservation };