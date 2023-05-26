const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacherModel");
const Parent = require("../models/parentModel");
const sendEmail = require("./sendEmail");
const crypto = require("crypto");
const session = require("express-session");

////create a token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_TOKEN, { expiresIn: "3d" });
};
//random verification code
const randomCode = () => {
  const randomBytes = crypto.randomBytes(3);
  const randomNumber = parseInt(randomBytes.toString("hex"), 16);
  const sixDigitRandomNumber = randomNumber % 1000000;

  return sixDigitRandomNumber.toString().padStart(6, "0");
};

//login user
const loginClient = async (req, res) => {
  const { cin, password } = req.body;

  try {
    let client;

    const teacher = await Teacher.findOne({ cin });

    if (teacher) {
      const teacher = await Teacher.logIn(cin, password);
      client = teacher;
    } else {
      const parent = await Parent.logIn(cin, password);
      if (parent) {
        client = parent;
      } else {
        throw new Error("cin ou mot de passe invalid");
      }
    }
    const email = client.email;
    const role = client.role;
    const token = createToken(client._id);
    res.status(200).json({ email, role, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//signup user
const signupClient = async (req, res) => {
  const { cin, nom, prenom, tel, email, password, confirmPass } = req.body;

  try {
    let client;
    const teacher = await Teacher.findOne({ cin });
    if (teacher) {
      const teacher = await Teacher.signup(
        cin,
        nom,
        prenom,
        tel,
        email,
        password,
        confirmPass
      );
      client = teacher;
    } else {
      const parent = await Parent.signup(
        cin,
        nom,
        prenom,
        tel,
        email,
        password,
        confirmPass
      );
      if (parent) {
        client = parent;
      } else {
        throw new Error("contactez l'administrateur pour vous ajouter !");
      }
    }
    const mail = client.email;
    const role = client.role;
    //create a token
    const token = createToken(client._id);
    res.status(200).json({ email, role, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sendCode = async (req, res) => {
  const { email } = req.body;
  try {
    const existP = await Parent.findOne({ email });
    const existT = await Teacher.findOne({ email });
    if (!(existP || existT)) {
      return res.status(400).json({ error: "cet email n'existe pas !" });
    }
    const code = randomCode();
    req.session.clientEmail = email;
    req.session.verifiedCode = code;
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = "mot de passe";
    const message = `
  <h3>votre code de verification</h3>
  <p>${code}</p>`;
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "email sent succesfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const verifyCode = async (req, res) => {
  const { code } = req.body;
  const { verifiedCode } = req.session;
  if (code === verifiedCode) {
    res.status(200).json({ verified: true });
  } else {
    res.status(200).json({ verified: false });
  }
};
const changePass = async (req, res) => {
  const { newPass, confirmNewPass } = req.body;
  const { clientEmail } = req.session;
  try {
    const parent = await Parent.findOne({ clientEmail });
    const teacher = await Teacher.findOne({ clientEmail });
    if (parent) {
      const updatedParent = await Parent.changePass(
        newPass,
        confirmNewPass,
        clientEmail
      );
      res.status(200).json({ success: true });
    } else if (teacher) {
      const updatedTeacher = await Teacher.changePass(
        newPass,
        confirmNewPass,
        clientEmail
      );

      res.status(200).json({ success: true });
    }
    if (!(parent || teacher)) {
      res.status(400).json({ message: "email n'existe pas !" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  loginClient,
  signupClient,
  sendCode,
  changePass,
  verifyCode,
};
