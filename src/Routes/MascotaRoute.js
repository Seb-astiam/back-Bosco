const { Router } = require("express");
const {createUserMascotaHandler, getAllUserMascotasHandler, deleteUserMascotaHandler, updateUserMascotaHandler} = require("../Handlers/userMascotaHandlers/userMascotaHandlers")


routeMascota = Router();

routeMascota.get("/allMascotas", getAllUserMascotasHandler );

routeMascota.post("/newMascota", createUserMascotaHandler);

routeMascota.delete('/mascota/:id', deleteUserMascotaHandler);

routeMascota.put('/mascota/:id', updateUserMascotaHandler);

module.exports = routeMascota;