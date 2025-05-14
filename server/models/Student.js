const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  classesAttended: Number,
  totalClassesConducted: Number,
});

const marksSchema = new mongoose.Schema({
  assignment: Number,
  lab: Number,
  theory: Number,
  aat: Number,
  cie1: Number,
  cie2: Number,
  cie3: Number,
});

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  semester: String,
  section: String,
  subject: String,
  attendance: attendanceSchema,
  marks: marksSchema,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

