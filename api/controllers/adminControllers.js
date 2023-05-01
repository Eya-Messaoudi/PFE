const Admin = require("../models/adminModel");
const Agent = require("../models/agentModel");
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
  const { email, password } = req.body;

  try {
    let user;

    const admin = await Admin.findOne({ email });
    // Check if the user is an admin
    if (admin) {
      const admin = await Admin.logIn(email, password);
      user = admin;
    } else {
      // Check if the user is an agent
      const agent = await Agent.logIn(email, password);
      if (agent) {
        user = agent;
      } else {
        throw new Error("Invalid email or password");
      }
    }

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//signup user
const signupAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.signup(email, password);

    //create a token
    const token = createToken(admin._id);
    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//signup user
const signupAgent = async (req, res) => {
  const { cin, nom, prenom, tel, email, password, confirmPassword } = req.body;

  try {
    const agent = await Agent.signup(
      cin,
      nom,
      prenom,
      tel,
      email,
      password,
      confirmPassword
    );

    //create a token
    const token = createToken(agent._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//retourner la liste des agents
const getAgents = async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
};
//creer un agent
const createAgent = async (req, res) => {
  const { cin, nom, prenom } = req.body;
  try {
    const agent = await Agent.createAgent(cin, nom, prenom);
    res.status(200).json({ agent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//supprimer un agent
const deleteAgent = async (req, res) => {
  const agent = await Agent.findByIdAndDelete(req.params.id);
  res.status(200).json({ agent });
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
    if (classe.teachers.some((t) => t._id.equals(teacher._id))) {
      throw Error("cet enseignant existe dans cette classe");
    }
    classe.teachers.push(teacher);
    classe.save();
    await teacher.addClass(classe._id);
    res.status(200).json({ teacher });
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
//modifier un user
const modifyTeacher = async (req, res) => {
  const { cin } = req.body;

  const existP = await Parent.findOne({ cin: cin });
  const existT = await Teacher.findOne({ cin: cin });
  if (existP || existT) {
    res.status(400).json({ error: "cin existant !" });
  }
  const updatedTeacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    { cin: cin },
    { new: true }
  );
  res.status(200).json({ teacher: updatedTeacher });
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
//modifier un user
const modifyParent = async (req, res) => {
  const { cin } = req.body;

  const existP = await Parent.findOne({ cin: cin });
  const existT = await Teacher.findOne({ cin: cin });
  if (existP || existT) {
    res.status(400).json({ error: "cin existant !" });
  }
  const updatedParent = await Parent.findByIdAndUpdate(
    req.params.id,
    { cin: cin },
    { new: true }
  );
  res.status(200).json({ parent: updatedParent });
};

//creer un parent dans la bd
const createP = async (req, res) => {
  const { cin, firstName, lastName, childs } = req.body;
  try {
    const parent = await Parent.createParent(
      cin,
      firstName,
      lastName,
      childs,
      Teacher
    );
    res.status(200).json({ parent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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
  const { cin, firstName, lastName, childs } = req.body;
  try {
    const parent = await Parent.createParent(
      cin,
      firstName,
      lastName,
      childs,
      Teacher
    );
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
  signupAdmin,
  signupAgent,
  getAgents,
  createAgent,
  deleteAgent,
  getClasses,
  getClasse,
  createClass,
  getTeachers,
  createT,
  addTeacher,
  createTeacher,
  modifyTeacher,
  removeTeacher,
  deleteTeacher,
  getParents,
  createP,
  addParent,
  createParent,
  modifyParent,
  deleteParent,
  removeParent,
  deleteClasse,
  getUser,
};