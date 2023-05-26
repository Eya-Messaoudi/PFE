const mongoose = require("mongoose");
const Classe = require("./classeModel");
const validator = require("validator");
const bcrypt = require("bcrypt");

const parentSchema = new mongoose.Schema({
  cin: Number,
  nom: String,
  prenom: String,
  tel: Number,
  email: String,
  role: { type: String, default: "parent" },
  password: String,
  confirmPass: String,
  childs: [
    {
      name: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
parentSchema.statics.createParent = async function (
  cin,
  nom,
  prenom,
  childs,
  Teacher
) {
  if (!cin || !nom || !prenom || !childs) {
    throw Error("tous les champs sont obligatoires !");
  }

  let startswith = false;
  const validate = cin.toString();
  function onlyNumbers(str) {
    const regex = /^\d+$/;
    return regex.test(str);
  }

  if (validate.charAt(0) === "0" || validate.charAt(0) === "1") {
    startswith = true;
  }

  if (!onlyNumbers(validate) || validate.length !== 8 || !startswith) {
    throw Error("merci d'entrer un cin valid!");
  }
  const existsT = await Teacher.findOne({ cin });
  const exists = await this.findOne({ cin });
  if (exists || existsT) {
    throw Error("cin existe !");
  }
  const role = "parent";
  const parent = await this.create({ cin, nom, prenom, role: role, childs });
  return parent;
};
//signup parent
parentSchema.statics.signup = async function (
  cin,
  nom,
  prenom,
  tel,
  email,
  password,
  confirmPassword
) {
  //email and password validation
  if (
    !cin ||
    !nom ||
    !prenom ||
    !tel ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    throw Error("tous les champs sont obligatoires");
  }
  let startswith = false;
  const validate = cin.toString();
  function onlyNumbers(str) {
    const regex = /^\d+$/;
    return regex.test(str);
  }
  if (validate.charAt(0) === "0" || validate.charAt(0) === "1") {
    startswith = true;
  }
  if (!onlyNumbers(validate) || !validate.length === 8 || !startswith) {
    throw Error("merci d'entrer un cin valid!");
  }
  const parentExist = await this.findOne({ cin });
  if (!parentExist) {
    throw Error("cin inexistant!");
  }

  if (!validator.isEmail(email)) {
    throw Error("merci d'entrer un email valid");
  }
  if (!onlyNumbers(tel) || !tel.length === 8) {
    throw Error("merci d'entrer un numéro valid!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("mot de passe trés faible !");
  }
  if (!validator.equals(password, confirmPassword)) {
    throw Error("mot de passe ne match pas!");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("cet email  existe");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const updatedParent = await this.findOneAndUpdate(
    { cin },
    { nom, prenom, tel, email, password: hashedPassword },
    { new: true }
  );
  return updatedParent;
};

parentSchema.statics.logIn = async function (cin, password) {
  if (!cin || !password) {
    throw Error("tous les champs sont obligatoires");
  }

  const parent = await this.findOne({ cin });
  if (!parent) {
    throw Error("Parent inexistant!");
  }
  const match = await bcrypt.compare(password, parent.password);
  if (!match) {
    throw Error("mot de passe incorrect!");
  }

  return parent;
};
parentSchema.statics.changePass = async function (
  newPass,
  confirmNewPass,
  clientEmail
) {
  if (!validator.isStrongPassword(newPass)) {
    throw Error("mot de passe trés faible !");
  }
  if (!validator.equals(newPass, confirmNewPass)) {
    throw Error("mot de passe ne match pas !");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPass, salt);
  const updatedParent = await this.findOneAndUpdate(
    { clientEmail },
    { password: hashedPassword }
  );
  return updatedParent;
};
module.exports = mongoose.model("Parent", parentSchema);
