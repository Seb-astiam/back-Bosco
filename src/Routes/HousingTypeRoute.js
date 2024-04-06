const { Router } = require("express");
const addTypeController = require("../Controllers/HosingTypeControlller/addType.Controller");
const  getTypeController = require('../Controllers/HosingTypeControlller/getTypeController');
const delTypeController = require("../Controllers/HosingTypeControlller/delTypeController");
const updateTypeController = require("../Controllers/HosingTypeControlller/updateTypeController");

routerType = Router();

routerType.get("/allTypes", getTypeController );

routerType.post("/newType", addTypeController);

routerType.delete("/:id", delTypeController);

routerType.put("/:id", updateTypeController);


module.exports = routerType;
 //  /housingtype/newtype
