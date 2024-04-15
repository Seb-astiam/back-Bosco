const express = require("express");
const router = express.Router();
const upload = require("../Midleware/Upload"); // Importa el middleware de Multer
const getHousings = require("../Controllers/HousingControllerV2/GetHosuing");
const addHousings = require("../Controllers/HousingControllerV2/AddHousing");
const updateHousing = require("../Controllers/HousingControllerV2/UpdateHosings");
const getHousingFiltered = require("../Controllers/HousingControllerV2/GetHousingFilteredController");
const Delhosuing = require("../Controllers/HousingControllerV2/Delhousings");
const OcupancyReport = require("../Controllers/Report/OcupancyReport");
const verifyToken = require("../Midleware/verifyToken");

router.post("/register", upload.array("images", 3), addHousings);
router.get("/allHousingslocation", getHousings);
router.get("/ocupancyreport", OcupancyReport);
router.get("/filtered", verifyToken, getHousingFiltered);
router.put("/update/:id", upload.array("images", 3), updateHousing),
  router.delete("/:id", Delhosuing);
module.exports = router;
