const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  body: String,
  subject: String,
  dueDate: String,
  studentId: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Assignment = mongoose.model("assignment", assignmentSchema);

const completedSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  subject: String,
  comp: String,
});

const Complete = mongoose.model("completeAssignment", completedSchema);

module.exports = {
  Assignment,
  Complete,
};
