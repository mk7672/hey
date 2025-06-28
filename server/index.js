require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// ===== Connect to MongoDB =====
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));

// ===== Login Schema and Model =====
const LoginSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }, // Hashed password
});
const Login = mongoose.model('Login', LoginSchema);

// ===== Subject and Student Schemas =====
const SubjectSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  aatMarks: { type: Number, required: true },
  assignmentMarks: { type: Number, required: true },
  cie1: { type: Number, required: true },
  cie2: { type: Number, required: true },
  cie3: { type: Number, required: true },
  theoryMarks: { type: Number, required: true },
  labMarks: { type: Number, required: true },
  classesAttended: { type: Number, required: true },
  totalClassesConducted: { type: Number, required: true },
});

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  semester: { type: String, required: true },
  section: { type: String, required: true },
  subjects: [SubjectSchema],
});

const Student = mongoose.model('Student', StudentSchema);

// ===== Test Save Route =====
app.get('/test-save', async (req, res) => {
  try {
    const student = new Student({
      studentId: 'test01',
      semester: '1',
      section: 'A',
      subjects: [{
        subject: 'Math',
        aatMarks: 20,
        assignmentMarks: 10,
        cie1: 8,
        cie2: 9,
        cie3: 10,
        theoryMarks: 9,
        labMarks: 10,
        classesAttended: 18,
        totalClassesConducted: 20,
      }],
    });
    await student.save();
    res.json({ message: 'Student saved!' });
  } catch (err) {
    res.status(500).json({ message: 'Save failed', error: err.message });
  }
});

// ===== POST: Save/Update Student Data =====
app.post('/api/student', async (req, res) => {
  try {
    const studentData = req.body;

    if (
      !studentData.studentId ||
      !studentData.semester ||
      !studentData.section ||
      !studentData.subjects ||
      !Array.isArray(studentData.subjects) ||
      studentData.subjects.length === 0
    ) {
      return res.status(400).json({ message: 'Missing or invalid required fields' });
    }

    const filter = {
      studentId: studentData.studentId,
      semester: studentData.semester,
      section: studentData.section,
    };

    const update = { subjects: studentData.subjects };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const savedStudent = await Student.findOneAndUpdate(filter, update, options);

    res.json({ message: 'Student saved!', student: savedStudent });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ message: 'Save failed', error: err.message });
  }
});

// ===== DELETE: Remove Student by ID =====
app.delete('/api/student/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findOneAndDelete({ studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: `Student with ID ${studentId} deleted successfully` });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ message: 'Failed to delete student', error: err.message });
  }
});

// ===== POST: Login Route =====
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:", username, password);  // <-- Log input data

  try {
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const user = await Login.findOne({ username });
    console.log("Found user:", user);  // <-- Log user object found in DB

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);  // <-- Log result of password check

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});


// ===== Start Server =====
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});
