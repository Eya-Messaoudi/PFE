const Admin = require("../models/adminModel");
const Classe = require("../models/classeModel");
const Teacher = require("../models/teacherModel");
const Parent = require("../models/parentModel");
const jwt = require("jsonwebtoken");
const { findById } = require("../models/adminModel");

//create a token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_TOKEN, { expiresIn: "3d" });
};
//get admins
const getAdmins = async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json(admins);
};
//login user
const loginUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const admin = await Admin.logIn(name, email, password);
    const token = createToken(admin._id);
    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const admin = await Admin.signup(name, email, password);

    //create a token
    const token = createToken(admin._id);
    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//retourner les listes de classes
const getClasses = async (req, res) => {
  const classes = await Classe.find();
  res.json(classes);
};
//retourner un classe selon id
const getClasse = async (req, res) => {
  const classe = await Classe.findById(req.params.id)
    .populate("teachers")
    .populate("parents");
  res.json(classe);
};
//ajouter une nouvelle classe
const createClass = async (req, res) => {
  const { name } = req.body;
  try {
    const classe = await Classe.createClass(name);
    res.status(200).json({ classe });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//retourner la liste des enseignants
const getTeachers = async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
};

//retourner un enseignant selon son id
/*const getTeacher = async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  res.json(teacher);
};*/

//creer un enseignant dans la bd
const createT = async (req, res) => {
  const { cin, firstName, lastName } = req.body;
  try {
    const teacher = await Teacher.createTeacher(
      cin,
      firstName,
      lastName,
      Parent
    );
    res.status(200).json({ teacher });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//ajouter un enseignant deja existant
const addTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.teacher);
    const classe = await Classe.findById(req.params.classe);
    classe.teachers.push(teacher);
    classe.save();
    await teacher.addClass(classe._id);
    res.status(200).json({ classe });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//creer un enseignant au sein d'une classe
const createTeacher = async (req, res) => {
  const { cin, firstName, lastName } = req.body;
  try {
    const teacher = await Teacher.createTeacher(
      cin,
      firstName,
      lastName,
      Parent
    );

    const classe = await Classe.findById(req.params.id);
    classe.teachers.push(teacher);
    classe.save();
    await teacher.addClass(classe._id);
    res.status(200).json({ classe, teacher });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//retirer un enseignant d'une classe
const removeTeacher = async (req, res) => {
  const teacher = await Teacher.findById(req.params.teacher);
  const classe = await Classe.findById(req.params.classe);
  classe.teachers = classe.teachers.filter(
    (item) => item.toString() !== teacher._id.toString()
  );
  await teacher.removeClass(classe._id);
  await classe.save();
  res.json({ classe, teacher });
};

//supprimer un enseignant du bd
const deleteTeacher = async (req, res) => {
  const teacher = await Teacher.findByIdAndDelete(req.params.id);
  res.status(200).json({ teacher });
};

//retourner la liste des parents
const getParents = async (req, res) => {
  const parents = await Parent.find();
  res.json(parents);
};

//retourner un parent selon son id
const getUser = async (req, res) => {
  let user = await Parent.findById(req.params.id);
  if (!user) {
    user = await Teacher.findById(req.params.id);
  }
  res.json(user);
};
//ajouter un parent deja existant
const addParent = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.parent);
    const classe = await Classe.findById(req.params.classe);
    const parents = classe.parents.push(parent);
    classe.save();
    res.status(200).json({ parents });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//creer un parent au sein d'une classe
const createParent = async (req, res) => {
  const { cin, firstName, lastName } = req.body;
  try {
    const parent = await Parent.createParent(cin, firstName, lastName, Teacher);
    const classe = await Classe.findById(req.params.id);
    classe.parents.push(parent);
    classe.save();
    res.status(200).json({ classe });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//retirer un parent d'une classe
const removeParent = async (req, res) => {
  const parent = await Parent.findById(req.params.parent);
  const classe = await Classe.findById(req.params.classe);
  const parents = classe.parents.filter(
    (item) => item.toString() !== parent._id.toString()
  );
  classe.parents = parents;
  classe.save();
  res.json({ classe });
};

//supprimer un parent du bd
const deleteParent = async (req, res) => {
  const parent = await Parent.findByIdAndDelete(req.params.id);
  res.status(200).json({ parent });
};

//supprimer un classe
const deleteClasse = async (req, res) => {
  const classe = await Classe.findByIdAndDelete(req.params.id);
  res.status(200).json({ classe });
};

module.exports = {
  getAdmins,
  loginUser,
  signupUser,
  getClasses,
  getClasse,
  createClass,
  getTeachers,
  createT,
  addTeacher,
  createTeacher,
  removeTeacher,
  deleteTeacher,
  getParents,
  addParent,
  createParent,
  deleteParent,
  removeParent,
  deleteClasse,
  getUser,
};
