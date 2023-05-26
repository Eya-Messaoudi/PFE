const Parent = require("../models/parentModel");
const Cours = require("../models/coursModel");
const Teacher = require("../models/teacherModel");
const Classe = require("../models/classeModel");
const Discussion = require("../models/discussionModel");
const mongoose = require("mongoose");
const getClasses = async (req, res) => {
  const parentId = req.parent._id;
  try {
    const classes = await Classe.find({ parents: parentId }).select("name _id");
    res.status(200).json(classes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const teachersList = async (req, res) => {
  try {
    const classe = await Classe.findById(req.params.id)
      .select("teachers")
      .populate("teachers", "-password -confirmPass -cin");
    const teachers = classe.teachers;
    res.status(200).json(teachers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getTeacherCours = async (req, res) => {
  const { teacherId, classeId } = req.params;
  try {
    const teacher = await Teacher.findById(teacherId);
    const classe = await Classe.findById(classeId);

    if (!teacher || !classe) {
      return res.status(404).json({ error: "Teacher or Classe not found." });
    }

    const cours = await Cours.find({
      teacher: teacher._id,
      classe: classe._id,
    })
      .sort({ createdAt: -1 })
      .populate("teacher", "-password -confirmPass -role -createdAt -cin")
      .populate("comments.replies.author", "name");

    res.status(200).json({ cours });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const profileTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).select(
      "-password -confirmPass -role -createdAt -cin"
    );
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const myProfile = async (req, res) => {
  const Id = req.parent._id;
  try {
    const me = await Parent.findById(Id).select(
      "-password -confirmPass -role -createdAt"
    );
    res.status(200).json(me);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getDiscussion = async (req, res) => {
  const parentId = req.parent._id;
  const { id } = req.params;
  try {
    const discussion = await Discussion.findOne(
      { teacher: id, parent: parentId },
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
  const parentId = req.parent._id;
  const { contenu } = req.body;
  try {
    let discussion = await Discussion.findOne({
      teacher: id,
      parent: parentId,
    });
    if (discussion) {
      discussion.messages.push({ sender: parentId, contenu: contenu });
      await discussion.save();
    } else {
      discussion = await Discussion.create({
        teacher: id,
        parent: parentId,
        messages: [
          {
            sender: parentId,
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

module.exports = {
  getClasses,
  teachersList,
  getTeacherCours,
  profileTeacher,
  myProfile,
  getDiscussion,
  sendMessage,
};
