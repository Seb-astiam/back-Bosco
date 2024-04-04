const { Router } = require("express");
const {  getAllServicesHandler, postServiceHandler, deleteServiceHandler, updateServiceHandler } = require("../Handlers/serviceHandler/serviceHandler");

routerService = Router();

routerService.get("/allServices", getAllServicesHandler );

routerService.post("/newService", postServiceHandler);

routerService.delete("/:id", deleteServiceHandler);

routerService.put("/:id", updateServiceHandler);


module.exports = {routerService};