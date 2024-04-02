const { Router } = require("express");
const { login } = require("../Handlers/loginHandler/loginHandler");
const { googleLogin } = require("../Handlers/loginHandler/googleLoginHandler");
const {
  googleRegister,
} = require("../Handlers/loginHandler/googleRegisterHandler");
const {
  facebookLogin,
} = require("../Handlers/loginHandler/facebookLoginHandler");
const {
  facebookRegister,
} = require("../Handlers/loginHandler/facebookRegisterHandler");
const {
  resetPassword,
} = require("../Handlers/loginHandler/resetPasswordHandler");
const activateAccountHandler = require("../Handlers/loginHandler/activateAccountHandler");

const routerLogin = Router();

routerLogin.post("/login", login);
routerLogin.post("/google-login", googleLogin);
routerLogin.post("/google-register", googleRegister);
routerLogin.post("/facebook-login", facebookLogin);
routerLogin.post("/facebook-register", facebookRegister);
routerLogin.post("/password-reset/:email", resetPassword);
routerLogin.post("/activate-account/:token", activateAccountHandler);

module.exports = { routerLogin };
