const Student = require('../models/Student');

// Add or update subject entry
exports.addOrUpdateSubject = async (req, res) => {
  try {
    const { studentId, semester, section, subjectData } = req.body;

    const student = await Student.findOne({ studentId, semester, section });

    if (student) {
      const existingSubjectIndex = student.subjects.findIndex(
        (s) => s.subject.toLowerCase() === subjectData.subject.toLowerCase()
      );

      if (existingSubjectIndex !== -1) {
        student.subjects[existingSubjectIndex] = subjectData;
      } else {
        student.subjects.push(subjectData);
      }

      await student.save();
      res.json({ message: 'Subject entry updated successfully', student });
    } else {
      const newStudent = new Student({
        studentId,
        semester,
        section,
        subjects: [subjectData],
      });

      await newStudent.save();
      res.json({ message: 'New student added successfully', student: newStudent });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// Delete a specific subject
exports.deleteSubject = async (req, res) => {
  try {
    const { studentId, semester, section, subjectName } = req.body;

    const student = await Student.findOne({ studentId, semester, section });

    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.subjects = student.subjects.filter(
      (s) => s.subject.toLowerCase() !== subjectName.toLowerCase()
    );

    if (student.subjects.length === 0) {
      await Student.deleteOne({ _id: student._id });
      return res.json({ message: 'Student deleted as no subjects left' });
    }

    await student.save();
    res.json({ message: 'Subject deleted successfully', student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete subject' });
  }
};
