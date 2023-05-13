const mongoose = require("mongoose");
const Classe = require("./classeModel");
const Teacher = require("./teacherModel");
const Parent = require("./parentModel");

const commentSchema = new mongoose.Schema({
  content: String,
  author: { type: mongoose.SchemaTypes.ObjectId, ref: Parent },
  createdAt: { type: Date, default: Date.now },
  replies: [
    {
      content: String,
      author: { type: mongoose.SchemaTypes.ObjectId, ref: Teacher },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const coursSchema = new mongoose.Schema({
  content: {
    text: String,
    fileUrl: String,
  },
  toDoBefore: { type: Date, default: Date.now },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: Teacher }, // <-- make sure this matches the name of your Teacher model
  classe: { type: mongoose.Schema.Types.ObjectId, ref: Classe },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

coursSchema.statics.creatCours = async function (
  content,
  toDoBefore,
  teacher,
  classe
) {
  if (!content || !toDoBefore) {
    throw Error("Ajouter un contenu et une date limite au devoir !");
  }
  if (!content) {
    throw Error("Ajouter un contenu au devoir !");
  }
  if (!toDoBefore) {
    throw Error("il faut ajouter une date limite!");
  }
  if (toDoBefore < Date.now) {
    throw Error("merci d'entrer une date valide !");
  }

  const cours = await this.create({ content, toDoBefore, teacher, classe });
  return cours;
};

module.exports = mongoose.model("Cours", coursSchema);
