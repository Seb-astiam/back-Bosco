const express = require("express");
const routerLoginbackOffice = express.Router();

const { loginBackOfficeHandler } = require("../Handlers/loginBackOffice/loginBackOfficeHandler")



routerLoginbackOffice.use("/", loginBackOfficeHandler);

module.exports = { routerLoginbackOffice };
