const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const Agent = require("../models/agentModel");

const requireAuth = async (req, res, next) => {
  //verify authorization
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "authorization required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = await Admin.findOne({ _id }).select("_id");
    if (!req.user) {
      req.user = await Agent.findOne({ _id }).select("_id");
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "request is not authorized" });
  }
};
module.exports = requireAuth;
