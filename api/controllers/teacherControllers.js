const Teacher = require("../models/teacherModel");
const Classe = require("../models/classeModel");
const Cours = require("../models/coursModel");
const Parent = require("../models/parentModel");
const Discussion = require("../models/discussionModel");

//retourner la liste des classes du enseignants
const getClasses = async (req, res) => {
  try {
    const teacherId = req.teacher._id;
    const classes = await Classe.find({ teachers: teacherId }).select(
      "name _id"
    );
    res.status(200).json(classes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const parentList = async (req, res) => {
  try {
    const classe = await Classe.findById(req.params.id)
      .populate("parents", "-password -confirmPass -role -createdAt -cin")
      .select("parents");
    const parents = classe.parents;
    res.status(200).json(parents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//retourner la lise des cours cree par enseignants
const getCours = async (req, res) => {
  const { classeId } = req.params;
  const teacherId = req.teacher._id;
  try {
    const cours = await Cours.find({
      teacher: teacherId,
      classe: classeId,
    })
      .sort({ createdAt: -1 })
      .populate("teacher", "-password -confirmPass -role -createdAt -cin")
      .populate("comments.replies.author", "name");

    res.status(200).json({ cours });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//creer une nouvel cours
const creatCours = async (req, res) => {
  const { classeId } = req.params;
  const teacherId = req.teacher._id;
  const { content, toDoBefore } = req.body;

  try {
    const cours = await Cours.creatCours(
      content,
      toDoBefore,
      teacherId,
      classeId
    );
    res.status(200).json(cours);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//supprimer un cours
const deleteCours = async (req, res) => {
  try {
    const cours = await Cours.findByIdAndDelete(req.params.id);
    res.status(200).json(cours);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDiscussion = async (req, res) => {
  const teacherId = req.teacher._id;
  const { id } = req.params;
  try {
    const discussion = await Discussion.findOne(
      { teacher: teacherId, parent: id },
      "messages" // Specify the fields you want to include
    ).sort({ "messages.sendAt": -1 }); // Sort based on messages' sendAt field
    const messages = discussion.messages;
    res.status(200).json({ messages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sendMessage = async (req, res) => {
  const { id } = req.params;
  const teacherId = req.teacher._id;
  const { contenu } = req.body;
  try {
    let discussion = await Discussion.findOne({
      teacher: teacherId,
      parent: id,
    });
    if (discussion) {
      discussion.messages.push({ sender: teacherId, contenu: contenu });
      await discussion.save();
    } else {
      discussion = await Discussion.create({
        teacher: teacherId,
        parent: id,
        messages: [
          {
            sender: teacherId,
            contenu: contenu,
          },
        ],
      });
    }
    res.status(200).json({ discussion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//parentProfile
const getParentProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const parent = await Parent.findById(id).select(
      "-password -confirmPass -role -createdAt -cin"
    );
    res.status(200).json(parent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const myProfile = async (req, res) => {
  const id = req.teacher._id;
  try {
    const me = await Teacher.findById(id).select(
      "-password -confirmPass -role -createdAt"
    );
    res.status(200).json(me);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getClasses,
  parentList,
  getCours,
  creatCours,
  getParentProfile,
  deleteCours,
  myProfile,
  sendMessage,
  getDiscussion,
};
