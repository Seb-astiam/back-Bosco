const { Router } = require("express");
const routerUser = require("./UserRoute");
const { routerMascota } = require("./MascotaRoute");
const routerLocation = require("./locationRoute");
const routerProfile = require("./profileRoute");
const { routerService } = require("./serviceRoute");
const { routerRole } = require("./RoleRoute");
const { routerLogin } = require("./loginRoute");

const router = Router();

router.use("/user", routerUser);

router.use("/", routerMascota);

router.use("/location", routerLocation);

router.use("/profile", routerProfile);

router.use("/service", routerService);

router.use("/role", routerRole);

router.use("/login", routerLogin);

module.exports = router;
