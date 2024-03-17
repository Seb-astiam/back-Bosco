const express = require("express");
const router = express.Router();

const filter = require('../Controllers/Filters/Filters')
router.get('/filterHousings',filter)
module.exports = router;