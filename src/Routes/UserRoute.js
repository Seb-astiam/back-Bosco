const express = require("express");
const {
  postUser,
  getUsers,
  getUserId,
  delUser,
  updateUserProfile,
} = require("../Handlers/userHandler/userHandler");

const routerUser = express.Router();

routerUser.post("/user", postUser);
routerUser.get("/user", getUsers);
routerUser.get("/user/:id", getUserId);
routerUser.delete("/user/:id", delUser);
routerUser.put("/user", updateUserProfile);

module.exports = routerUser;
