const { Router } = require("express");
const {createUserMascotaHandler} = require("../Handlers/userMascotaHandlers/userMascotaHandlers")


routeMascota = Router();

routeMascota.post("/newMascota", createUserMascotaHandler);