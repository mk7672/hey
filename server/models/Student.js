const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  semester: String,
  section: String,
  subject: String,
  assignmentMarks: Number,
  labMarks: Number,
  theoryMarks: Number,
  attendance: Number,
});

module.exports = mongoose.model('Student', studentSchema);
