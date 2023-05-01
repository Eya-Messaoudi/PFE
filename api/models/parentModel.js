const mongoose = require("mongoose");
const Classe = require("./classeModel");
const parentSchema = new mongoose.Schema({
  cin: Number,
  firstName: String,
  lastName: String,
  password: String,
  childs: [
    {
      name: String,
      classe: { type: mongoose.SchemaTypes.ObjectId, ref: "Classe" },
    },
  ],
  /*passwordConfirm: {
    type: String,
    //required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },*/
});
parentSchema.statics.createParent = async function (
  cin,
  firstName,
  lastName,
  childs,
  Teacher
) {
  if (!cin || !firstName || !lastName || !childs) {
    throw Error("tous les champs sont obligatoires !");
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
  const existsT = await Teacher.findOne({ cin });
  const exists = await this.findOne({ cin });
  if (exists || existsT) {
    throw Error("cin existe !");
  }
  const parent = await this.create({ cin, firstName, lastName, childs });
  return parent;
};
module.exports = mongoose.model("Parent", parentSchema);
