import React, { useState } from 'react';

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

  const calculateTotalMarks = (subj) => {
    return (
      subj.aatMarks +
      subj.assignmentMarks +
      subj.theoryMarks +
      subj.labMarks
    );
  };

  const checkEligibility = (subj) => {
  const attendancePercent = subj.totalClassesConducted > 0
    ? (subj.classesAttended / subj.totalClassesConducted) * 100
    : 0;

  const cie1 = Number(subj.cie1);
  const cie2 = Number(subj.cie2);
  const cie3 = Number(subj.cie3);
  const cieTotal = cie1 + cie2 + cie3;

  const isCieValid = cie1 >= 4 && cie2 >= 4 && cie3 >= 4 && cieTotal >= 12;
  const isAatValid = subj.aatMarks >= 8; // ✅ updated for out of 20
  const isAssignmentValid = subj.assignmentMarks >= 4;
  const isLabValid = subj.labMarks >= 4;
  const isAttendanceValid = attendancePercent >= 85;

  return isCieValid && isAatValid && isAssignmentValid && isLabValid && isAttendanceValid;
};



 const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  for (const key in formData) {
    if (!formData[key]) {
      setMessage(`Please fill the ${key} field.`);
      return;
    }
  }

  const {
    studentId,
    semester,
    section,
    subject,
    aatMarks,
    assignmentMarks,
    cie1,
    cie2,
    cie3,
    labMarks,
    classesAttended,
    totalClassesConducted,
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
    cie1: Number(cie1),
    cie2: Number(cie2),
    cie3: Number(cie3),
    theoryMarks: theoryScaled,
    labMarks: Number(labMarks),
    classesAttended: Number(classesAttended),
    totalClassesConducted: Number(totalClassesConducted),
  };

  // Find student index in current local state
  const studentIndex = studentsData.findIndex(
    (s) =>
      s.studentId === studentId.trim() &&
      s.semester === semester.trim() &&
      s.section === section.trim()
  );

  let studentToSend; // Will hold updated student to send to backend

  if (editMode) {
    // Update subject locally
    const updatedStudents = [...studentsData];
    updatedStudents[editStudentIndex].subjects[editSubjectIndex] = newSubject;
    setStudentsData(updatedStudents);

    // Send updated full student to backend
    studentToSend = updatedStudents[editStudentIndex];

    setEditMode(false);
    setEditStudentIndex(null);
    setEditSubjectIndex(null);
    setMessage('Subject updated locally!');
  } else {
    if (studentIndex !== -1) {
      // Student exists locally, add new subject if not duplicate
      const student = studentsData[studentIndex];
      const duplicate = student.subjects.find(
        (subj) => subj.subject.toLowerCase() === newSubject.subject.toLowerCase()
      );
      if (duplicate) {
        setMessage(`Marks for subject "${subject}" already entered.`);
        return;
      }

      const updatedStudent = { ...student };
      updatedStudent.subjects = [...updatedStudent.subjects, newSubject];

      const newStudentsData = [...studentsData];
      newStudentsData[studentIndex] = updatedStudent;
      setStudentsData(newStudentsData);

      // Send updated full student to backend
      studentToSend = updatedStudent;
    } else {
      // New student - create and add to local state
      const newStudent = {
        studentId: studentId.trim(),
        semester: semester.trim(),
        section: section.trim(),
        subjects: [newSubject],
      };
      setStudentsData([...studentsData, newStudent]);

      // Send new student to backend
      studentToSend = newStudent;
    }
  }

  // Send to MongoDB backend
  try {
    const response = await fetch('http://localhost:5000/api/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentToSend), // <-- send the full updated student object
    });

    const result = await response.json();
    if (response.ok) {
      console.log(result.message);
      setMessage('Data saved to database!');
    } else {
      console.error(result);
      setMessage(result.error || result.message || 'Failed to save data to database.');
      console.error('Backend error response:', result);  // log this
    }
  } catch (err) {
    console.error('Fetch error:', err);
    setMessage('Error connecting to backend: ' + err.message);
  }

  // Reset form fields
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

    setFormData({
      studentId: student.studentId,
      semester: student.semester,
      section: student.section,
      subject: subject.subject,
      aatMarks: subject.aatMarks,
      assignmentMarks: subject.assignmentMarks,
      cie1: subject.cie1,
      cie2: subject.cie2,
      cie3: subject.cie3,
      labMarks: subject.labMarks,
      classesAttended: subject.classesAttended,
      totalClassesConducted: subject.totalClassesConducted,
    });

    setEditMode(true);
    setEditStudentIndex(studentIdx);
    setEditSubjectIndex(subjectIdx);
    setShowTable(false);
    setMessage('');
  };

  const handleDelete = async (studentIdx, subjectIdx) => {
  const updatedStudents = [...studentsData];
  const student = updatedStudents[studentIdx];

  student.subjects.splice(subjectIdx, 1); // remove the subject

  if (student.subjects.length === 0) {
    updatedStudents.splice(studentIdx, 1); // remove the student if no subjects left
  }

  setStudentsData(updatedStudents);
  setMessage('Subject entry deleted.');

  // ✅ Check if no subjects left, then delete the student from DB
  if (student.subjects.length === 0) {
    try {
      const response = await fetch(`http://localhost:5000/api/student/${student.studentId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log('Student deleted:', result.message);
    } catch (err) {
      console.error('Failed to sync student deletion with backend:', err);
    }
  } else {
    // If there are still subjects, just update the student in DB
    try {
      const response = await fetch('http://localhost:5000/api/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });

      const result = await response.json();
      console.log('Student updated after subject deletion:', result.message);
    } catch (err) {
      console.error('Failed to sync student update with backend:', err);
    }
  }
};


  const renderInputField = (key, value) => {
  // Fields that are marks and should have "(out of 10)" in placeholder
const marksFields = ['assignmentMarks', 'cie1', 'cie2', 'cie3', 'labMarks'];

  if (key === 'semester') {
    return (
      <select name="semester" value={value} onChange={handleChange} style={inputStyle}>
        <option value="">Select Semester</option>
        {[2, 3, 4].map((sem) => (
          <option key={sem} value={sem}>{sem}</option>
        ))}
      </select>
    );
  } else if (key === 'section') {
    return (
      <select name="section" value={value} onChange={handleChange} style={inputStyle}>
        <option value="">Select Section</option>
        {['A', 'B'].map((sec) => (
          <option key={sec} value={sec}>{sec}</option>
        ))}
      </select>
    );
  } else if (key === 'subject') {
    const options = subjectOptions[formData.semester] || [];
    return (
      <select name="subject" value={value} onChange={handleChange} style={inputStyle}>
        <option value="">Select Subject</option>
        {options.map((subj) => (
          <option key={subj} value={subj}>{subj}</option>
        ))}
      </select>
    );
  } else {
    // Format base placeholder text
    let placeholderText = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

    if (key === 'aatMarks') {
  placeholderText += ' (out of 20)';
} else if (marksFields.includes(key)) {
  placeholderText += ' (out of 10)';
}


    // Append (out of 10) for marks fields only
    if (marksFields.includes(key)) {
      placeholderText += ' (out of 10)';
    }

    return (
      <input
        key={key}
        name={key}
        type={marksFields.concat(['classesAttended', 'totalClassesConducted']).includes(key) ? 'number' : 'text'}
        value={value}
        onChange={handleChange}
        placeholder={placeholderText}
        style={inputStyle}
        min={0}
      />
    );
  }
};


  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={headingStyle} marginTop="20px">Student Marks</h1>
      <div style={containerStyle}>
        {!showTable ? (
          <>
            
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
              {Object.entries(formData).map(([key, value]) => (
                <React.Fragment key={key}>{renderInputField(key, value)}</React.Fragment>
              ))}
              
             {message && (
  <div
    style={{
      gridColumn: 'span 4',
      marginTop: 8,
      marginBottom: 0,
      textAlign: 'center',
      fontSize: '18px',
      color: message.toLowerCase().includes('success') ? 'green' : 'red',
      width: '100%',
    }}
  >
    {message}
  </div>
)}


              <div style={{ gridColumn: 'span 4', textAlign: 'center', marginTop: 8 }}>
    <button type="submit" style={buttonStyle}>
      {editMode ? 'Update Entry' : 'Add Entry'}
    </button>
    <button
      type="button"
      onClick={() => {
        setShowTable(true);
        setMessage('');  // clear message when switching to table
      }}
      style={{ ...buttonStyle, marginLeft: 12 }}
      disabled={studentsData.length === 0}
    >
      View Table
    </button>
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
            <button
  onClick={() => {
    setShowTable(false);
    setMessage('');  // clear message when going back
  }}
  style={{ ...buttonStyle, marginBottom: 12 }}
>
  Back to Input
</button>
          </>
        )}
      </div>
    </div>
  );
}

function StudentMarksTable({ studentsData, calculateTotalMarks, checkEligibility, handleEdit, handleDelete }) {
  return (
    <div style={{ overflowY: 'scroll', maxHeight: '45vh', border: '2px solid #333', borderRadius: 5, padding: 16, width: '100%' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '1200px', fontFamily: 'Arial, sans-serif' }}>
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
            <tr key={`${student.studentId}-${student.semester}-${student.section}`}>
              <td style={tdStyle}>{student.studentId}</td>
              <td style={tdStyle}>{student.semester}</td>
              <td style={tdStyle}>{student.section}</td>
              <td style={{ ...tdStyle, textAlign: 'left' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {student.subjects.map((subj, subjectIdx) => {
                    const totalMarks = calculateTotalMarks(subj);
                    const attendancePercent = subj.totalClassesConducted > 0
                      ? ((subj.classesAttended / subj.totalClassesConducted) * 100).toFixed(1)
                      : '0';
                    const eligible = checkEligibility(subj);

                    return (
                      <div key={subjectIdx} style={{ flex: '1 0 calc(33.33% - 12px)', minWidth: '250px', marginBottom: 8, padding: 8, border: '1px solid #ccc', borderRadius: 6, backgroundColor: eligible ? '#e0f7e9' : '#fce4e4', position: 'relative' }}>
                        <strong>{subj.subject}</strong>
                        <br />
                        AAT: {subj.aatMarks}, Assignment: {subj.assignmentMarks}
                        <br />
                        CIE1: {subj.cie1}, CIE2: {subj.cie2}, CIE3: {subj.cie3}, Theory(Scaled): {subj.theoryMarks}
                        <br />
                        Lab: {subj.labMarks}
                        <br />
                        <strong>Total:</strong> {totalMarks}, <strong>Attendance %:</strong> {attendancePercent}%
                        <br />
                        <strong style={{ color: eligible ? 'green' : 'red' }}>{eligible ? 'Eligible' : 'Not Eligible'}</strong>
                        <div style={{ marginTop: 6 }}>
                          <button onClick={() => handleEdit(studentIdx, subjectIdx)} style={{ ...smallButtonStyle, marginRight: 8 }}>Edit</button>
                          <button onClick={() => handleDelete(studentIdx, subjectIdx)} style={smallButtonStyle}>Delete</button>
                        </div>
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

const headingStyle = {
  fontFamily: "'Dancing Script', cursive",
  fontSize: '80px',
  textAlign: 'center',
  marginBottom: '70px',
  marginTop: '50px'
};

const containerStyle = {
  border: '2px solid black',
  boxShadow: '0 0 10px red',
  padding: '20px',
  borderRadius: '10px',
  backgroundColor: '#fff',
  fontSize: '18px',
};

const inputStyle = {
  padding: '15px 20px',
  fontSize: 20,
  borderRadius: 5,
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const buttonStyle = {
  padding: '15px 20px',
  fontSize: 20,
  borderRadius: 5,
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
};

const smallButtonStyle = {
  padding: '5px 10px',
  fontSize: 14,
  borderRadius: 5,
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#28a745',
  color: 'white',
};

const thStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'center',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'center',
  verticalAlign: 'top',
}; 