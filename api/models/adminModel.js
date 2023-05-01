const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static SignUp method
adminSchema.statics.signup = async function (email, password) {
  //email and password validation
  if (!email || !password) {
    throw Error("tous les champs sont obligatoires");
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

  const admin = await this.create({ email, password: hashedPassword });

  return admin;
};
//static login method
adminSchema.statics.logIn = async function (email, password) {
  if (!email || !password) {
    throw Error("tous les champs sont obligatoires!");
  }

  const admin = await this.findOne({ email });
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
