// const express = require('express');
// const router = express.Router();
// const Student = require('../models/Student');


// // POST: Save student marks
// router.post('/', async (req, res) => {
//   try {
//     const newStudent = new Student(req.body);
//     await newStudent.save();
//     res.status(201).json({ message: 'Marks saved successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to save marks' });
//   }
// });

// // GET: View all students or filter by query
// router.get('/', async (req, res) => {
//   try {
//     const { semester, section, subject } = req.query;

//     const filter = {};
//     if (semester) filter.semester = semester;
//     if (section) filter.section = section;
//     if (subject) filter.subject = subject;

//     const students = await Student.find(filter);
//     res.json(students);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch marks' });
//   }
// });

// module.exports = router;

const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const router = express.Router();

// Helper to extract and verify JWT
const verifyToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token');
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, 'erenyeager');
  return decoded;
};

// POST: Save student marks (with inline auth check)
router.post('/', async (req, res) => {
  try {
    const decoded = verifyToken(req);
    const studentData = {
      ...req.body,
      createdBy: decoded.id
    };

    const newStudent = new Student(studentData);
    await newStudent.save();
    res.status(201).json({ message: 'Marks saved successfully' });
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized or failed to save marks' });
  }
});

// GET: Fetch marks only created by the logged-in user
router.get('/', async (req, res) => {
  try {
    const decoded = verifyToken(req);
    const { semester, section, subject } = req.query;

    const filter = { createdBy: decoded.id };
    if (semester) filter.semester = semester;
    if (section) filter.section = section;
    if (subject) filter.subject = subject;

    const students = await Student.find(filter);
    res.json(students);
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized or failed to fetch marks' });
  }
});

module.exports = router;
