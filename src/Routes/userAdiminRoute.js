const { Router } = require("express");

const userAdiminController = require("../Controllers/userAdminController/userAdminContoller");


const routerUser = Router();

routerUser.post("/", userAdiminController);


module.exports = routerUser;
