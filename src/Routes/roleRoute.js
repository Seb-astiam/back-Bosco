const { Router } = require("express");
const { postRole, getAllRoles, getAllRolesHandler, postRoleHandler,
     updateRoleHandler, deleteRoleHandler } = require("../Handlers/roleHandler/roleHandler");

routerRole = Router();

routerRole.get("/allRoles", getAllRolesHandler );

routerRole.post("/newRole", postRoleHandler);

routerRole.delete("/role/:id", deleteRoleHandler);

routerRole.put("/role/:id", updateRoleHandler);


module.exports = {routerRole};