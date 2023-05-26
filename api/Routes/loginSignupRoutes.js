const express = require("express");
const {
  loginClient,
  signupClient,
  sendCode,
  changePass,
  verifyCode,
} = require("../controllers/loginSignupCtrl");
const loginSignupRoute = express.Router();

loginSignupRoute.post("/login", loginClient);
loginSignupRoute.post("/signup", signupClient);
loginSignupRoute.post("/sendCode", sendCode);
loginSignupRoute.post("/verifyCode", verifyCode);
loginSignupRoute.put("/changePassword", changePass);
module.exports = loginSignupRoute;
