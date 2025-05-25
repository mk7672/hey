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
    console.error('Save error:', err.message);
    res.status(500).json({ error: 'Failed to save marks' });
  }
});

// GET: Fetch all students
router.get('/', async (req, res) => {
  try {

    const students = await Student.find();
    res.json(students);

  } catch (err) {
    console.error('Fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch marks' });
  }
});

module.exports = router;
