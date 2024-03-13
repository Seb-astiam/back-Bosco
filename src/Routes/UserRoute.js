const express = require("express");
const { postUser } = require("../Handlers/userHandler/userHandler");

const routerUser = express.Router();

routerUser.post("/user");

module.exports = routerUser;
