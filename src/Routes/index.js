const { Router } = require("express");
const { routerUser } = require("./UserRoute");

const router = Router();

router.use("/user", routerUser);

module.exports = { router };
