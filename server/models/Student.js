const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  subject: String,
  aatMarks: Number,
  assignmentMarks: Number,
  cie1: Number,
  cie2: Number,
  cie3: Number,
  theoryMarks: Number,
  labMarks: Number,
  classesAttended: Number,
  totalClassesConducted: Number,
});

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  semester: { type: String, required: true },
  section: { type: String, required: true },
  subjects: [SubjectSchema],
});

// MongoDB collection will be named 'students' automatically
module.exports = mongoose.model('Student', StudentSchema);
