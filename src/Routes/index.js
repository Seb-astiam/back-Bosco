const { Router } = require("express");
const routerUser = require("./UserRoute");
const { routerMascota } = require("./MascotaRoute");
const routerLocation = require("./locationRoute");
const { routerService } = require("./serviceRoute");
const { routerRole } = require("./RoleRoute");
const Housings = require("./HousingsRoute");
const express = require("express");
const path = require("path");

const router = Router();

const imagesRouter = express.Router();

imagesRouter.get("/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, `../Uploads/${imageName}`);

  // Sirve la imagen
  res.sendFile(imagePath);
});

router.use("/Uploads", imagesRouter);

// Agrega el resto de las rutas
router.use("/user", routerUser);
router.use("/", routerMascota);
router.use("/location", routerLocation);
router.use("/service", routerService);
router.use("/role", routerRole);
router.use("/profileHousing", Housings);

module.exports = router;
