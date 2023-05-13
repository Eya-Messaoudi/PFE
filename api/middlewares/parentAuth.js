const Parent = require("../models/parentModel");
const jwt = require("jsonwebtoken");
const parentAuthRequire = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "Authorization requise !" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET_TOKEN);
    req.parent = await Parent.findById(_id).select("_id");
    if (!req.parent) {
      return res.status(400).json({ error: "you are not a parent !" });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "request unauthorized !" });
  }
};
module.exports = parentAuthRequire;
