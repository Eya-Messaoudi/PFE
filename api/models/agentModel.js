const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const agentSchema = new mongoose.Schema({
  cin: Number,
  nom: String,
  prenom: String,
  tel: Number,
  email: String,
  password: String,
  confirmPassword: String,
});

//static SignUp method
agentSchema.statics.signup = async function (
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
  const agentExist = await this.findOne({ cin });
  if (!agentExist) {
    throw Error("cin inexistant!");
  }

  if (!validator.isEmail(email)) {
    throw Error("merci d'entrer un email valid");
  }
  if (!onlyNumbers(tel) || tel.length !== 8) {
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

  const updatedAgent = await this.findOneAndUpdate(
    { cin },
    { nom, prenom, tel, email, password: hashedPassword },
    { new: true }
  );
  return updatedAgent;
};
//static login method
agentSchema.statics.logIn = async function (email, password) {
  if (!email || !password) {
    throw Error("tous les champs sont obligatoires");
  }

  const agent = await this.findOne({ email });
  if (!agent) {
    throw Error("agent inexistant!");
  }
  const match = await bcrypt.compare(password, agent.password);
  if (!match) {
    throw Error("mot de passe incorrect!");
  }

  return agent;
};

agentSchema.statics.createAgent = async function (cin, nom, prenom) {
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
  const exists = await this.findOne({ cin });
  if (exists) {
    throw Error("cin existe !");
  }
  const agent = await this.create({ cin, nom, prenom });
  return agent;
};

module.exports = mongoose.model("Agent", agentSchema);
