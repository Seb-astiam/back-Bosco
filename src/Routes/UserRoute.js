const { Router } = require("express");
const {
  postUser,
  getUsers,
  delUser,
  updateUserProfile,
  getUserEmail,
  blockAccountHandler,
  getUserByIdHandler
} = require("../Handlers/userHandler/userHandler");


const routerUser = Router();

routerUser.post("/", postUser);
routerUser.get("/", getUsers);
routerUser.get("/:email", getUserEmail);
routerUser.get("/UserById/:id", getUserByIdHandler)
routerUser.delete("/:email", delUser);
routerUser.put("/", updateUserProfile);
routerUser.put("/status", blockAccountHandler)

module.exports = routerUser;
