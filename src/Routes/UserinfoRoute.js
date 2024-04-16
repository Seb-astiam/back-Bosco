const { Router } = require("express");
const userProileController = require("../Controllers/UserSearchBOController/userProfileController");
const userSearchController = require("../Controllers/UserSearchBOController/userSearchController");
const routerUserinfo = Router();
routerUserinfo.get("/", userSearchController)
routerUserinfo.post("/:id",  userProileController)

module.exports = routerUserinfo;