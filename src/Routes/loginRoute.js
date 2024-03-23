const { Router } = require("express");
const { login } = require("../Handlers/loginHandler/loginHandler");
const { googleLogin } = require("../Handlers/loginHandler/googleLoginHandler");
const {
  googleRegister,
} = require("../Handlers/loginHandler/googleRegisterHandler");

const routerLogin = Router();

routerLogin.post("/login", login);
routerLogin.post("/google-login", googleLogin);
routerLogin.post("/google-register", googleRegister);

module.exports = { routerLogin };
