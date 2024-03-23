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
<<<<<<< HEAD
routerUser.delete("/:email", delUser);
=======
routerUser.delete("/:email", delUser);
>>>>>>> 9ebe548 (handler controller googlelogin guille)
routerUser.put("/", updateUserProfile);

module.exports = routerUser;
