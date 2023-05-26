const Teacher = require("./teacherModel");
const Parent = require("./parentModel");
const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
  teacher: { type: mongoose.SchemaTypes.ObjectId, ref: Teacher },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: Parent },
  messages: [
    {
      sender: { type: mongoose.SchemaTypes.ObjectId },
      contenu: String,
      sendAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("discussion", discussionSchema);
