const { Router } = require("express");
const routerUser = require("./UserRoute");
const { routerMascota } = require("./MascotaRoute");
const routerLocation = require("./locationRoute");
const routerProfile = require("./profileRoute");
const { routerService } = require("./serviceRoute");
const { routerRole } = require("./roleRoute");
const routerUserinfo = require('./UserinfoRoute')
const Housings = require("./HousingsRoute");
const   routerHousingType =require('./HousingTypeRoute')
const express = require("express");
const path = require("path");

const { routerLogin } = require("./loginRoute");

const { routerLoginbackOffice } = require("./routerLoginbackOffice");
const { routerReservation } = require("./routeReservation");

const router = Router();

const imagesRouter = express.Router();

imagesRouter.get("/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, `../Uploads/${imageName}`);

  // Sirve la imagen
  res.sendFile(imagePath);
});

router.use("/Uploads", imagesRouter);

router.use("/profile", routerProfile);

// Agrega el resto de las rutas
router.use("/user", routerUser);
router.use("/userinfo", routerUserinfo);
router.use("/", routerMascota);
router.use("/location", routerLocation);
router.use("/service", routerService);
router.use("/role", routerRole);
router.use('/housingtype', routerHousingType)
router.use("/profileHousing", Housings);

router.use("/loginBackOffice", routerLoginbackOffice);
router.use("/auth", routerLogin);

router.use("/reservation", routerReservation);

module.exports = router;
