const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

//static SignUp method
adminSchema.statics.signup = async function (name, email, password) {
  //email and password validation
  if (!name || !email || !password) {
    throw Error("tous les cases doivent etre remplis");
  }
  if (!validator.isEmail(email)) {
    throw Error("merci d'entrer un email valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("mot de passe tres court");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("ce email deja existe");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await this.create({ name, email, password: hashedPassword });

  return admin;
};
//static login method
adminSchema.statics.logIn = async function (name, email, password) {
  if (!name || !email || !password) {
    throw Error("tous les cases doivent etre remplis!");
  }

  const admin = await this.findOne({ email, name });
  if (!admin) {
    throw Error("admin n'existe pas!");
  }
  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    throw Error("mot de passe incorrect!");
  }
  return admin;
};

module.exports = mongoose.model("Admin", adminSchema);
