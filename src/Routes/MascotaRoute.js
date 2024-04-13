const { Router } = require("express");
const {
  createUserMascotaHandler,
  getAllUserMascotasHandler,
  deleteUserMascotaHandler,
  updateUserMascotaHandler,
  getUserMascotasHandler,
  getMascotaByIdHandler,
} = require("../Handlers/userMascotaHandlers/userMascotaHandlers");
const upload = require("../Midleware/Upload");
const verifyToken = require("../Midleware/verifyToken");

routerMascota = Router();

routerMascota.get("/allMascotas/:UserId", getAllUserMascotasHandler);

routerMascota.post(
  "/newMascota",
  upload.array("images"),
  createUserMascotaHandler
);

routerMascota.delete("/mascota/:id", deleteUserMascotaHandler);

routerMascota.put(
  "/mascota/:id",
  upload.array("images"),
  updateUserMascotaHandler
);

routerMascota.get("/userMascotas/:id", getUserMascotasHandler);

routerMascota.get("/getMascotaById/:idMascota", getMascotaByIdHandler);

module.exports = { routerMascota };
