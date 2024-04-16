const express = require("express");
const router = express.Router();
const upload = require("../Midleware/Upload"); // Importa el middleware de Multer
const getHousings = require("../Controllers/HousingControllerV2/GetHosuing");
const addHousings = require("../Controllers/HousingControllerV2/AddHousing");

const getHousingFiltered = require("../Controllers/HousingControllerV2/GetHousingFilteredController");
const getHousingById = require("../Controllers/HousingControllerV2/GetHosuingById");

router.post("/register", upload.array("images", 3), addHousings);
router.get("/allHousingslocation", getHousings);

router.get("/housingsById", getHousingById);

router.get("/filtered", getHousingFiltered);

module.exports = router;
