import React, { useState } from 'react';
import axios from 'axios';

export default function StudentMarksForm() {
  const [formData, setFormData] = useState({
    studentId: '',
    semester: '',
    section: '',
    subject: '',
    aatMarks: '',
    assignmentMarks: '',
    cie1: '',
    cie2: '',
    cie3: '',
    labMarks: '',
    classesAttended: '',
    totalClassesConducted: '',
  });

  const [studentsData, setStudentsData] = useState([]);
  const [message, setMessage] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editStudentIndex, setEditStudentIndex] = useState(null);
  const [editSubjectIndex, setEditSubjectIndex] = useState(null);

  const subjectOptions = {
    2: ['Chemistry', 'Electrical', 'C++', 'Electronics'],
    3: ['COA', 'Python', 'DSA', 'OOPS'],
    4: ['OS', 'ADS', 'Maths', 'DAA'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage('');
  };

  const calculateTheoryScaled = (cie1, cie2, cie3) => {
    const sum = Number(cie1) + Number(cie2) + Number(cie3);
    return Math.round((sum * 10) / 30);
  };

  const calculateTotalMarks = (subj) =>
    subj.aatMarks + subj.assignmentMarks + subj.theoryMarks + subj.labMarks;

  const checkEligibility = (subj) => {
    const attendancePercent = subj.totalClassesConducted > 0
      ? (subj.classesAttended / subj.totalClassesConducted) * 100
      : 0;

    const cie1 = Number(subj.cie1);
    const cie2 = Number(subj.cie2);
    const cie3 = Number(subj.cie3);
    const cieTotal = cie1 + cie2 + cie3;

    return (
      cie1 >= 4 &&
      cie2 >= 4 &&
      cie3 >= 4 &&
      cieTotal >= 12 &&
      subj.aatMarks >= 8 &&
      subj.assignmentMarks >= 4 &&
      subj.labMarks >= 4 &&
      attendancePercent >= 85
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (!formData[key]) {
        setMessage(`Please fill the ${key} field.`);
        return;
      }
    }

    const {
      studentId, semester, section, subject,
      aatMarks, assignmentMarks, cie1, cie2, cie3,
      labMarks, classesAttended, totalClassesConducted
    } = formData;

    if (Number(classesAttended) > Number(totalClassesConducted)) {
      setMessage('Classes attended cannot be more than total classes conducted.');
      return;
    }

    const theoryScaled = calculateTheoryScaled(cie1, cie2, cie3);

    const newSubject = {
      subject: subject.trim(),
      aatMarks: Number(aatMarks),
      assignmentMarks: Number(assignmentMarks),
      theoryMarks: theoryScaled,
      cie1: Number(cie1),
      cie2: Number(cie2),
      cie3: Number(cie3),
      labMarks: Number(labMarks),
      classesAttended: Number(classesAttended),
      totalClassesConducted: Number(totalClassesConducted),
    };

    const studentIndex = studentsData.findIndex(
      (s) =>
        s.studentId === studentId.trim() &&
        s.semester === semester.trim() &&
        s.section === section.trim()
    );

    let updatedData = [...studentsData];

    if (editMode) {
      updatedData[editStudentIndex].subjects[editSubjectIndex] = newSubject;
      setMessage('Subject updated successfully!');
    } else {
      if (studentIndex !== -1) {
        const duplicate = updatedData[studentIndex].subjects.find(
          (subj) => subj.subject.toLowerCase() === newSubject.subject.toLowerCase()
        );
        if (duplicate) {
          setMessage(`Marks for subject "${subject}" already entered.`);
          return;
        }
        updatedData[studentIndex].subjects.push(newSubject);
      } else {
        updatedData.push({
          studentId: studentId.trim(),
          semester: semester.trim(),
          section: section.trim(),
          subjects: [newSubject],
        });
      }
      setMessage('Entry added successfully!');
    }

    setStudentsData(updatedData);
    setEditMode(false);
    setEditStudentIndex(null);
    setEditSubjectIndex(null);

    try {
      await axios.post('http://localhost:5000/api/students', updatedData);
    } catch (err) {
      console.error('Error saving data:', err);
      setMessage('Error saving data to server.');
    }

    setFormData({
      studentId: '',
      semester: '',
      section: '',
      subject: '',
      aatMarks: '',
      assignmentMarks: '',
      cie1: '',
      cie2: '',
      cie3: '',
      labMarks: '',
      classesAttended: '',
      totalClassesConducted: '',
    });
  };

  const handleEdit = (studentIdx, subjectIdx) => {
    const student = studentsData[studentIdx];
    const subject = student.subjects[subjectIdx];
    setFormData({ ...student, ...subject });
    setEditMode(true);
    setEditStudentIndex(studentIdx);
    setEditSubjectIndex(subjectIdx);
    setShowTable(false);
    setMessage('');
  };

const handleDelete = async (studentIdx, subjectIdx) => {
  const student = studentsData[studentIdx];
  const subject = student.subjects[subjectIdx];

  try {
    await axios.delete('http://localhost:5000/api/students', {
      data: {
        studentId: student.studentId,
        semester: student.semester,
        section: student.section,
        subject: subject.subject
      }
    });

    const updated = [...studentsData];
    updated[studentIdx].subjects.splice(subjectIdx, 1);
    if (updated[studentIdx].subjects.length === 0) {
      updated.splice(studentIdx, 1);
    }
    setStudentsData(updated);
    setMessage('Subject entry deleted.');
  } catch (err) {
    console.error('Error deleting subject:', err);
    setMessage('Failed to delete subject.');
  }
};


  const handleViewTable = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/students');
      setStudentsData(res.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setMessage('Error fetching data from server.');
    }
    setShowTable(true);
    setMessage('');
  };

  const renderInputField = (key, value) => {
    const marksFields = ['assignmentMarks', 'cie1', 'cie2', 'cie3', 'labMarks'];
    let placeholder = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    if (key === 'aatMarks') placeholder += ' (out of 20)';
    if (marksFields.includes(key)) placeholder += ' (out of 10)';

    if (key === 'semester') {
      return (
        <select name={key} value={value} onChange={handleChange} style={inputStyle}>
          <option value="">Select Semester</option>
          {[2, 3, 4].map((sem) => <option key={sem}>{sem}</option>)}
        </select>
      );
    } else if (key === 'section') {
      return (
        <select name={key} value={value} onChange={handleChange} style={inputStyle}>
          <option value="">Select Section</option>
          {['A', 'B'].map((sec) => <option key={sec}>{sec}</option>)}
        </select>
      );
    } else if (key === 'subject') {
      const options = subjectOptions[formData.semester] || [];
      return (
        <select name={key} value={value} onChange={handleChange} style={inputStyle}>
          <option value="">Select Subject</option>
          {options.map((subj) => <option key={subj}>{subj}</option>)}
        </select>
      );
    }

    return (
      <input
        name={key}
        value={value}
        type={marksFields.concat(['classesAttended', 'totalClassesConducted']).includes(key) ? 'number' : 'text'}
        onChange={handleChange}
        placeholder={placeholder}
        style={inputStyle}
        min={0}
      />
    );
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', maxHeight: '100vh', overflowY: 'auto' }}>
      <h1 style={headingStyle}>Student Marks</h1>
      <div style={containerStyle}>
        {!showTable ? (
          <>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              {Object.entries(formData).map(([key, value]) => (
                <React.Fragment key={key}>{renderInputField(key, value)}</React.Fragment>
              ))}
              {message && (
                <div style={{
                  gridColumn: 'span 4', textAlign: 'center', fontSize: 18,
                  color: message.toLowerCase().includes('success') ? 'green' : 'red'
                }}>{message}</div>
              )}
              <div style={{ gridColumn: 'span 4', textAlign: 'center' }}>
                <button type="submit" style={buttonStyle}>{editMode ? 'Update Entry' : 'Add Entry'}</button>
                <button type="button" onClick={handleViewTable} disabled={!studentsData.length}
                  style={{ ...buttonStyle, marginLeft: 12 }}>View Table</button>
              </div>
            </form>
          </>
        ) : (
          <>
            <StudentMarksTable
              studentsData={studentsData}
              calculateTotalMarks={calculateTotalMarks}
              checkEligibility={checkEligibility}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            <br />
            <button onClick={() => setShowTable(false)} style={buttonStyle}>Back to Input</button>
          </>
        )}
      </div>
    </div>
  );
}

function StudentMarksTable({ studentsData, calculateTotalMarks, checkEligibility, handleEdit, handleDelete }) {
  return (
    <div style={{
      overflowX: 'auto',
      overflowY: 'scroll',
      maxHeight: '45vh',
      border: '2px solid #333',
      borderRadius: 5,
      padding: 16,
      width: '100%'
    }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '1200px' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
            <th style={thStyle}>Student ID</th>
            <th style={thStyle}>Semester</th>
            <th style={thStyle}>Section</th>
            <th style={thStyle}>Subjects</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student, studentIdx) => (
            <tr key={studentIdx}>
              <td style={tdStyle}>{student.studentId}</td>
              <td style={tdStyle}>{student.semester}</td>
              <td style={tdStyle}>{student.section}</td>
              <td style={{ ...tdStyle, textAlign: 'left' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {student.subjects.map((subj, subjectIdx) => {
                    const total = calculateTotalMarks(subj);
                    const attendance = subj.totalClassesConducted > 0
                      ? ((subj.classesAttended / subj.totalClassesConducted) * 100).toFixed(1)
                      : '0';
                    const eligible = checkEligibility(subj);
                    return (
                      <div key={subjectIdx} style={{
                        flex: '1 0 calc(33% - 12px)',
                        backgroundColor: eligible ? '#e0f7e9' : '#fce4e4',
                        padding: 10, borderRadius: 6, border: '1px solid #ccc'
                      }}>
                        <strong>{subj.subject}</strong><br />
                        AAT: {subj.aatMarks}, Assign: {subj.assignmentMarks}<br />
                        CIEs: {subj.cie1}, {subj.cie2}, {subj.cie3}, Scaled: {subj.theoryMarks}<br />
                        Lab: {subj.labMarks}, Total: {total}, Attendance: {attendance}%<br />
                        <b style={{ color: eligible ? 'green' : 'red' }}>{eligible ? 'Eligible' : 'Not Eligible'}</b><br />
                        <button onClick={() => handleEdit(studentIdx, subjectIdx)} style={smallButtonStyle}>Edit</button>
                        <button onClick={() => handleDelete(studentIdx, subjectIdx)} style={smallButtonStyle}>Delete</button>
                      </div>
                    );
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styles
const headingStyle = {
  fontFamily: "'Dancing Script', cursive", fontSize: '60px',
  textAlign: 'center', marginBottom: '40px'
};
const containerStyle = {
  border: '2px solid black',
  boxShadow: '0 0 10px red',
  padding: '20px',
  borderRadius: '10px',
  backgroundColor: '#fff',
  maxHeight: 'calc(100vh - 150px)',
  overflowY: 'auto'
};
const inputStyle = {
  padding: '15px 20px', fontSize: 18, borderRadius: 5, border: '1px solid #ccc', width: '100%'
};
const buttonStyle = {
  padding: '12px 18px', fontSize: 16, borderRadius: 5,
  backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer'
};
const smallButtonStyle = {
  marginTop: 8, marginRight: 8, padding: '4px 8px',
  backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: 4, fontSize: 13
};
const thStyle = {
  padding: '10px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold'
};
const tdStyle = {
  padding: '10px', border: '1px solid #ddd', textAlign: 'center'
};
