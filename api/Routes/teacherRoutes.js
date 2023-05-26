const {
  getClasses,
  parentList,
  getCours,
  creatCours,
  getParentProfile,
  deleteCours,
  myProfile,
  getDiscussion,
  sendMessage,
} = require("../controllers/teacherControllers");

const express = require("express");
const router = express.Router();
const teacherAuthRequire = require("../middlewares/teacherAuthRequire");

router.use(teacherAuthRequire);
//retourner la liste des classe d'un enseignant
router.get("/Classes", getClasses);
router.get("/parentsList/:id", parentList);
router.get("/cours/:classeId", getCours);
router.post("/creatCours/:classeId", creatCours);
router.get("/parentProfile/:id", getParentProfile);
router.get("/myProfile", myProfile);
router.delete("/deleteCours/:id", deleteCours);
router.get("/discussion/:id", getDiscussion);
router.post("/sendMessage/:id", sendMessage);
module.exports = router;
