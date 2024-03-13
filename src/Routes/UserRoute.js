const express = require("express");
const { postUser } = require("../Handlers/userHandler/userHandler");

const routerUser = express.Router();

routerUser.post("/user");
routerUser.get("/user");

module.exports = routerUser;
