const express = require("express");
const router = express.Router();
//controller functions
const {
  getClasses,
  getClasse,
  createClass,
  getTeachers,
  addTeacher,
  createTeacher,
  removeTeacher,
  deleteTeacher,
  getParents,
  addParent,
  createParent,
  removeParent,
  deleteParent,
  deleteClasse,
  getTeacher,
  getParent,
  createT,
  getUser,
  createAgent,
  deleteAgent,
  getAgents,
  modifyParent,
  createP,
  modifyTeacher,
} = require("../controllers/adminControllers");
const requireAuth = require("../middlewares/requireAuth");
const adminLoginRoute = require("./adminLogin");

/*
//retourner la liste des admines
router.get("/admins", getAdmins);

//login route admin +agent
router.post("/logIn", loginUser);

//signUp route Admin
router.post("/signUp", signupAdmin);

//signUp route Agent
router.post("/signUpAgent", signupAgent);*/

//retourner la liste des agents

router.use(adminLoginRoute);
router.use(requireAuth);

router.get("/agents", getAgents);

//createAgent
router.post("/creatAgent", createAgent);

//supprimer un agent
router.delete("/deleteAgent/:id", deleteAgent);

//class routes
//retourner les liste de classes route
router.get("/classes", getClasses);

//classe selon id route
router.get("/classe/:id", getClasse);

//ajouter une noouvelle classe route
router.post("/new", createClass);

//retourner la liste des enseignants
router.get("/teachers", getTeachers);
//retourner un enseignant selon son id
//router.get("/teacher/:id", getTeacher);

//creer un enseignant dans la bd
router.post("/newTeacher", createT);

//ajouter un enseignant deja existant
router.get("/addteacher/:classe/:teacher", addTeacher);

//creer un enseignant dans une classe
router.post("/newTeacher/:id", createTeacher);

//modifier enseignant
router.put("/modifierT/:id", modifyTeacher);

//supprimer un enseignant d'une classe
router.get("/removeT/:classe/:teacher", removeTeacher);

//supprimer un enseignant du bd
router.delete("/delete/:id", deleteTeacher);

//retourner la liste des parents
router.get("/parents", getParents);

//retourner un utilisateur selon son id
router.get("/user/:id", getUser);

//creer un parent dans bd
router.post("/newParent", createP);
//ajouter un parent deja existant
router.get("/addParent/:classe/:parent", addParent);

//creer un parent dans une classe
router.post("/newParent/:id", createParent);

//modifier parent
router.put("/modifierP/:id", modifyParent);
//supprimer un parent d'une classe
router.get("/removeP/:classe/:parent", removeParent);

//supprimer un parent du bd
router.delete("/deleteP/:id", deleteParent);
router.delete("/deleteC/:id", deleteClasse);
module.exports = router;
