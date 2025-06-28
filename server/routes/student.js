const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
// POST: Save or update student marks
router.post('/', async (req, res) => {
  try {
console.log('Received student:', { studentId, semester, section, subjects });

    const { studentId, semester, section, subjects } = req.body;

    // Validate the required fields
    if (!studentId || !semester || !section || !Array.isArray(subjects)) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const existingStudent = await Student.findOne({ studentId, semester, section });

    if (existingStudent) {
      // Check for duplicate subjects (case-insensitive)
      const existingSubjectNames = existingStudent.subjects.map(s => s.subject.toLowerCase());

      const newSubjects = subjects.filter(
        (subj) => !existingSubjectNames.includes(subj.subject.toLowerCase())
      );

      if (newSubjects.length === 0) {
        return res.status(409).json({ message: 'All subjects already exist for this student.' });
      }

      existingStudent.subjects.push(...newSubjects);
      await existingStudent.save();
      res.status(200).json({ message: 'Student record updated with new subjects.' });
    } else {
      // Create a new student record
      const newStudent = new Student({ studentId, semester, section, subjects });
      await newStudent.save();
      console.log('Saved student to DB');

      res.status(201).json({ message: 'New student record created.' });
    }
  } catch (err) {
  
  console.error('❌ Save error:', err);
  res.status(500).json({
    error: 'Failed to save marks',
    message: err.message,
    stack: err.stack,
  });

  }
});

// GET: Fetch all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST to upsert students
router.post('/', async (req, res) => {
  const newData = req.body;

  try {
    for (const entry of newData) {
      const existingStudent = await Student.findOne({
        studentId: entry.studentId,
        semester: entry.semester,
        section: entry.section
      });

      if (existingStudent) {
        existingStudent.subjects = entry.subjects;
        await existingStudent.save();
      } else {
        const student = new Student(entry);
        await student.save();
      }
    }

    res.status(200).json({ message: 'Student data saved successfully.' });
  } catch (err) {
    console.error('Error saving student data:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE a specific subject from a student
router.delete('/', async (req, res) => {
  const { studentId, semester, section, subject } = req.body;

  try {
    const student = await Student.findOne({ studentId, semester, section });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.subjects = student.subjects.filter((s) => s.subject !== subject);

    if (student.subjects.length === 0) {
      await Student.deleteOne({ _id: student._id });
    } else {
      await student.save();
    }

    res.status(200).json({ message: 'Subject deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
