const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


// POST: Save student marks
router.post('/', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: 'Marks saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save marks' });
  }
});

// GET: View all students or filter by query
router.get('/', async (req, res) => {
  try {
    const { semester, section, subject } = req.query;

    const filter = {};
    if (semester) filter.semester = semester;
    if (section) filter.section = section;
    if (subject) filter.subject = subject;

    const students = await Student.find(filter);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch marks' });
  }
});

module.exports = router;

