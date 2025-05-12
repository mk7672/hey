const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  section: { type: String, required: true },
  subject: { type: String, required: true },
  marks: { type: Number, required: true },
  eligibility: { type: Boolean, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
