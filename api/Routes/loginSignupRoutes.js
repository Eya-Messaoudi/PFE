const express = require("express");
const { loginClient, signupClient } = require("../controllers/loginSignupCtrl");
const loginSignupRoute = express.Router();

loginSignupRoute.post("/login", loginClient);
loginSignupRoute.post("/signup", signupClient);
module.exports = loginSignupRoute;
