const express = require("express");
const {
  postUser,
  getUsers,
  getUserId,
} = require("../Handlers/userHandler/userHandler");

const routerUser = express.Router();

routerUser.post("/user", postUser);
routerUser.get("/user", getUsers);
routerUser.get("/user/:id", getUserId);

module.exports = routerUser;
