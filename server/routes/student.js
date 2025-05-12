const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Add or Update Marks and Eligibility
router.post('/add', async (req, res) => {
  const { uid, section, subject, marks } = req.body;

  const eligibility = marks >= 40; // Example rule

  try {
    let student = await Student.findOne({ uid, section, subject });

    if (student) {
      student.marks = marks;
      student.eligibility = eligibility;
      await student.save();
      return res.json({ message: 'Marks updated successfully', eligibility });
    }

    student = new Student({ uid, section, subject, marks, eligibility });
    await student.save();
    res.json({ message: 'Marks added successfully', eligibility });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch Eligibility
router.get('/check', async (req, res) => {
  const { uid, section, subject } = req.query;

  try {
    const student = await Student.findOne({ uid, section, subject });
    if (!student) {
      return res.status(404).json({ error: 'Student record not found' });
    }
    res.json({ eligibility: student.eligibility });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
