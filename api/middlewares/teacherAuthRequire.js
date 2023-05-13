const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacherModel");

const teacherAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "authorization requise" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET_TOKEN);
    req.teacher = await Teacher.findOne({ _id }).select("_id");
    if (!req.teacher) {
      return res.status(400).json({ error: "you are not a teacher !" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "request is not authorized" });
  }
};
module.exports = teacherAuth;
