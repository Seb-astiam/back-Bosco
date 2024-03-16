const { Router } = require("express");
const routerUser = require("./UserRoute");
const { routerMascota } = require("./MascotaRoute");
const routerLocation = require("./locationRoute");
const routerProfile = require("./profileRoute");
const router = Router();

router.use("/user", routerUser);

router.use("/", routerMascota);

router.use("/location", routerLocation);

router.use("/profile", routerProfile);

module.exports = router;
