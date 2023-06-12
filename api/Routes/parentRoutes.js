const {
  getClasses,
  teachersList,
  getTeacherCours,
  profileTeacher,
  myProfile,
  getDiscussion,
  sendMessage,
  changeEmail,
  changeTel,
  addAcomment,
} = require("../controllers/parentControllers");
const express = require("express");
const router = express.Router();
const parentAuthRequire = require("../middlewares/parentAuth");

router.use(parentAuthRequire);

router.get("/classes", getClasses);
router.get("/details/:id", teachersList);
router.get("/teacherCours/:teacherId/:classeId", getTeacherCours);
router.get("/teacherProfile/:id", profileTeacher);
router.get("/myProfile", myProfile);
router.get("/discussion/:id", getDiscussion);
router.post("/sendMessage/:id", sendMessage);
router.post("/addAcomment/:id", addAcomment);
router.put("/changeEmail", changeEmail);
router.put("/changeTel", changeTel);
module.exports = router;
