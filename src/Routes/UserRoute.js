const express = require("express");
const { postUser, getUsers } = require("../Handlers/userHandler/userHandler");

const routerUser = express.Router();

routerUser.post("/user", postUser);
routerUser.get("/user", getUsers);

module.exports = routerUser;
