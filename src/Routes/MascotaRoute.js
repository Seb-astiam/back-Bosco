const { Router } = require("express");
const {createUserMascotaHandler, getAllUserMascotasHandler, deleteUserMascotaHandler, updateUserMascotaHandler, getMascotaByIdHandler} = require("../Handlers/userMascotaHandlers/userMascotaHandlers")


routerMascota = Router();

routerMascota.get("/allMascotas/:UserId", getAllUserMascotasHandler );

routerMascota.post("/newMascota", createUserMascotaHandler);

routerMascota.delete('/mascota/:id', deleteUserMascotaHandler);

routerMascota.put('/mascota/:id', updateUserMascotaHandler);

routerMascota.get('/getMascotaById/:idMascota', getMascotaByIdHandler)

module.exports = {routerMascota};