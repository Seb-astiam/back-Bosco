const { Router } = require("express");
const {
  postUserProfile,
  getUserProfile,
  delUserProfile,
  updateUserProfile,
} = require("../Handlers/profileHandler/profileHandler");

const routerProfile = Router();

routerProfile.post("/", postUserProfile);
routerProfile.get("/:email", getUserProfile);
routerProfile.delete("/:userId", delUserProfile);
routerProfile.put("/", updateUserProfile);

module.exports = routerProfile;
