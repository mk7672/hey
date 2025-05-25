// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     roll: { type: String, required: true },
//     semester: { type: String, required: true },
//     section: { type: String, required: true },
//     subject: { type: String, required: true },
//     marks: { type: Number, required: true }
// });

// module.exports = mongoose.model('Student', studentSchema);
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  aatMarks: Number,
  assignmentMarks: Number,
  theoryMarks: Number,
  cie1: Number,
  cie2: Number,
  cie3: Number,
  labMarks: Number,
  classesAttended: Number,
  totalClassesConducted: Number,
}, { _id: false });

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  semester: { type: String, required: true },
  section: { type: String, required: true },
  subjects: [subjectSchema]
});

module.exports = mongoose.model('Student', studentSchema);
