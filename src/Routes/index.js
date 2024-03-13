const express = require("express");
const { routerUser } = require("./UserRoute");

const router = express.Router();

router.use("/user", routerUser);

module.exports = router;
