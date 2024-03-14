const { Router } = require("express");
const  routerUser  = require("./UserRoute");
const {routerMascota} = require("./MascotaRoute")
const router = Router();

router.use("/user", routerUser);

router.use("/", routerMascota);
module.exports = router ;
