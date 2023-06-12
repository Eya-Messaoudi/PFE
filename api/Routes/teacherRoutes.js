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
  changeEmail,
  changeTel,
  modifyCours,
  getMatiere,
  addAreply,
} = require("../controllers/teacherControllers");

const express = require("express");
const router = express.Router();
const teacherAuthRequire = require("../middlewares/teacherAuthRequire");
const upload = require("../middlewares/upload");
router.use(teacherAuthRequire);

router.get("/Classes", getClasses);
router.get("/parentsList/:id", parentList);
router.get("/cours/:classeId", getCours);
router.post("/creatCours/:classeId", upload, creatCours);
router.get("/parentProfile/:id", getParentProfile);
router.get("/myProfile", myProfile);
router.delete("/deleteCours/:id", deleteCours);
router.get("/discussion/:id", getDiscussion);
router.post("/sendMessage/:id", sendMessage);
router.post("/addAreply/:id/:commentId", addAreply);
router.put("/changeEmail", changeEmail);
router.put("/changeText/:id", modifyCours);
router.get("/getMatiere", getMatiere);
module.exports = router;
