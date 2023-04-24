const mongoose = require("mongoose");
const Teacher = require("./teacherModel");
const Parent = require("./parentModel");
const classeSchema = new mongoose.Schema({
  name: String,
  parents: [{ type: mongoose.SchemaTypes.ObjectId, ref: Parent }],
  teachers: [{ type: mongoose.SchemaTypes.ObjectId, ref: Teacher }],
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

/*classeSchema.statics.addTeacher = async function (teacher) {
  const id = teacher._id;
  let exists = false;
  for (let i = 0; i < this.teachers.length; i++) {
    if (this.teachers[i]._id === id) {
      exists = true;
    }
  }
  if (exists) {
    throw Error("cet enseignant existe dejà!");
  }
  const teachers = this.teachers.push(teacher);
  return teachers;
};*/

module.exports = mongoose.model("classe", classeSchema);
