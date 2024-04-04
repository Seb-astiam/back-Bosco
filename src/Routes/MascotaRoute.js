const { Router } = require("express");
const {createUserMascotaHandler, getAllUserMascotasHandler, deleteUserMascotaHandler, updateUserMascotaHandler, getUserMascotasHandler} = require("../Handlers/userMascotaHandlers/userMascotaHandlers")


routerMascota = Router();

routerMascota.get("/allMascotas/:UserId", getAllUserMascotasHandler );

routerMascota.post("/newMascota", createUserMascotaHandler);

routerMascota.delete('/mascota/:id', deleteUserMascotaHandler);

routerMascota.put('/mascota/:id', updateUserMascotaHandler);

routerMascota.get("/userMascotas/:id", getUserMascotasHandler );

module.exports = {routerMascota};