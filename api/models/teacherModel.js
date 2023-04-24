const mongoose = require("mongoose");
const Classe = require("./classeModel");

const teacherSchema = new mongoose.Schema({
  cin: Number,
  firstName: String,
  lastName: String,
  classes: [{ type: mongoose.SchemaTypes.ObjectId, ref: Classe }],
});

// Add a method to add a class to the teacher's classes array
teacherSchema.methods.addClass = async function (classeId) {
  this.classes.push(classeId);
  await this.save();
};

// Add a method to remove a class from the teacher's classes array
teacherSchema.methods.removeClass = async function (classeId) {
  this.classes = this.classes.filter(
    (id) => id.toString() !== classeId.toString()
  );
  await this.save();
};

teacherSchema.statics.createTeacher = async function (
  cin,
  firstName,
  lastName,
  Parent
) {
  if (!cin || !firstName || !lastName) {
    throw Error("tous les champs doivent etre remplis !");
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
  const existsP = await Parent.findOne({ cin });
  const exists = await this.findOne({ cin });
  if (exists || existsP) {
    throw Error("cin existe dejà!");
  }
  const teacher = await this.create({ cin, firstName, lastName });
  return teacher;
};

module.exports = mongoose.model("teacher", teacherSchema);
