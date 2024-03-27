const express = require("express");
const routerLoginbackOffice = express.Router();

const { loginBackOfficeHandler } = require("../Handlers/loginBackOfficeHandler/loginBackOfficeHandler")



routerLoginbackOffice.use("/", loginBackOfficeHandler);

module.exports = { routerLoginbackOffice };
