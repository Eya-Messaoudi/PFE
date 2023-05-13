const mongoose = require("mongoose");
const Teacher = require("./teacherModel");
const Parent = require("./parentModel");
const classeSchema = new mongoose.Schema({
  name: String,
  parents: [{ type: mongoose.SchemaTypes.ObjectId, ref: Parent }],
  teachers: [{ type: mongoose.SchemaTypes.ObjectId, ref: Teacher }],
  createdAt: { type: Date, default: Date.now },
});

classeSchema.statics.createClass = async function (name) {
  if (!name) {
    throw Error("merci d'entrer le nom du classe!");
  }
  const exists = await this.findOne({ name });
  if (exists) {
    throw Error("ce classe dejà existe ");
  }
  const classe = await this.create({ name });
  return classe;
};

module.exports = mongoose.model("classe", classeSchema);
