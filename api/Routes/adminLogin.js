const express = require("express");
const logInRouter = express.Router();
const {
  signupAdmin,
  signupAgent,
  getAdmins,
  loginUser,
} = require("../controllers/adminControllers");

//retourner la liste des admines
logInRouter.get("/admins", getAdmins);

//login route admin +agent
logInRouter.post("/logIn", loginUser);

//signUp route Admin
logInRouter.post("/signUp", signupAdmin);

//signUp route Agent
logInRouter.post("/signUpAgent", signupAgent);
module.exports = logInRouter;
