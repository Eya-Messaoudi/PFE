const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacherModel");
const Parent = require("../models/parentModel");

////create a token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_TOKEN, { expiresIn: "3d" });
};

//login user
const loginClient = async (req, res) => {
  const { cin, password } = req.body;

  try {
    let client;

    const teacher = await Teacher.findOne({ cin });
    // Check if the user is an admin
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
module.exports = {
  loginClient,
  signupClient,
};
