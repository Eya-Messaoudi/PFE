const {
  getClasses,
  teachersList,
  getTeacherCours,
  profileTeacher,
  myProfile,
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
module.exports = router;
