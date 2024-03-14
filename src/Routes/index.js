const { Router } = require("express");
const routerUser = require("./UserRoute");
const { routerMascota } = require("./MascotaRoute");
const routerLocation = require("./locationRoute");
const router = Router();

router.use("/user", routerUser);

router.use("/", routerMascota);

router.use("/location", routerLocation);

module.exports = router;
