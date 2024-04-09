const { Router } = require("express");
const {
  postUser,
  getUsers,
  delUser,
  updateUserProfile,
  getUserEmail,
  blockAccountHandler,
  updatePictureProfile
} = require("../Handlers/userHandler/userHandler");
const upload = require("../Midleware/Upload");

const routerUser = Router();

routerUser.post("/", postUser);
routerUser.get("/", getUsers);
routerUser.get("/:email", getUserEmail);
routerUser.delete("/:email", delUser);
routerUser.put("/", updateUserProfile);
routerUser.put("/pictureUser", upload.array("picture"), updatePictureProfile);
routerUser.put("/status", blockAccountHandler)

module.exports = routerUser;
