const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const teacherSchema = new mongoose.Schema({
  cin: Number,
  nom: String,
  prenom: String,
  tel: Number,
  email: String,
  role: { type: String, default: "teacher" },
  password: String,
  confirmPass: String,
  createdAt: { type: Date, default: Date.now },
});

teacherSchema.statics.createTeacher = async function (
  cin,
  nom,
  prenom,
  Parent
) {
  if (!cin || !nom || !prenom) {
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
  const existsP = await Parent.findOne({ cin });
  const exists = await this.findOne({ cin });
  if (exists || existsP) {
    throw Error("cin existe dejà!");
  }
  const role = "teacher";
  const teacher = await this.create({ cin, nom, prenom, role: role });
  return teacher;
};

//Signup func
teacherSchema.statics.signup = async function (
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
  if (!onlyNumbers(validate) || validate.length !== 8 || !startswith) {
    throw Error("merci d'entrer un cin valid!");
  }
  const teacherExist = await this.findOne({ cin });
  if (!teacherExist) {
    throw Error("cin inexistant!");
  }

  if (!validator.isEmail(email)) {
    throw Error("merci d'entrer un email valid");
  }
  if (!onlyNumbers(tel) || !tel.length == 8) {
    throw Error("merci d'entrer un numéro valid!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("mot de passe tres court");
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

  const updatedTeacher = await this.findOneAndUpdate(
    { cin },
    { nom, prenom, tel, email, password: hashedPassword },
    { new: true }
  );
  return updatedTeacher;
};

//login func
teacherSchema.statics.logIn = async function (cin, password) {
  if (!cin || !password) {
    throw Error("tous les champs sont obligatoires");
  }

  const teacher = await this.findOne({ cin });
  if (!teacher) {
    throw Error("enseignant inexistant!");
  }
  const match = await bcrypt.compare(password, teacher.password);
  if (!match) {
    throw Error("mot de passe incorrect!");
  }

  return teacher;
};
teacherSchema.statics.changePass = async function (
  newPass,
  confirmNewPass,
  clientEmail
) {
  if (!validator.isStrongPassword(password)) {
    throw Error("mot de passe trés faible !");
  }
  if (!validator.equals(newPass, confirmNewPass)) {
    throw Error("mot de passe ne match pas !");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPass, salt);
  const updatedTeacher = await this.findOneAndUpdate(
    { clientEmail },
    { password: hashedPassword }
  );
  return updatedTeacher;
};

module.exports = mongoose.model("teacher", teacherSchema);
