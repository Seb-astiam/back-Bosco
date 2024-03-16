const { Router } = require("express");
const { login } = require("../Handlers/loginHandler/loginHandler");

const routerLogin = Router();

routerLogin.use("/", login);

module.exports = routerLogin;
