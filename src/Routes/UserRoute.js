const { Router } = require("express");
const {
  postUser,
  getUsers,
  delUser,
  updateUserProfile,
  getUserEmail,
} = require("../Handlers/userHandler/userHandler");

const routerUser = Router();

routerUser.post("/", postUser);
routerUser.get("/", getUsers);
routerUser.get("/:email", getUserEmail);
routerUser.delete("/:email", delUser);
routerUser.put("/", updateUserProfile);

module.exports = routerUser;
