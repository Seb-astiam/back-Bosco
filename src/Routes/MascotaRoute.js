const { Router } = require("express");
const {createUserMascotaHandler, getAllUserMascotasHandler, deleteUserMascotaHandler, updateUserMascotaHandler} = require("../Handlers/userMascotaHandlers/userMascotaHandlers")


routerMascota = Router();

routerMascota.get("/allMascotas", getAllUserMascotasHandler );

routerMascota.post("/newMascota", createUserMascotaHandler);

routerMascota.delete('/mascota/:id', deleteUserMascotaHandler);

routerMascota.put('/mascota/:id', updateUserMascotaHandler);

module.exports = {routerMascota};