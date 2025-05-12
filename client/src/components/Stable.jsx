import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


 

const StudentMarksTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const calculateEligibility = (student) => {
    const { classesAttended, totalClassesConducted } = student.attendance;
    const { theory, lab, assignment } = student.marks;

    const attendancePercent = (classesAttended / totalClassesConducted) * 100;
    const totalMarks = theory + lab + assignment;

    return attendancePercent >= 85 && totalMarks >= 20 ? '✅ Eligible' : '❌ Not Eligible';
  };

  const handleBack = () => {
    navigate("/pl")
  };

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); // assuming token is stored here
      const res = await fetch('http://localhost:5000/api/student', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Unauthorized');
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }

      setStudents(data);
    } catch (err) {
      console.error('Error fetching student data:', err);
      setStudents([]); // Avoid crashing map()
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  if (loading) return <div className="text-center mt-10 text-xl">Loading student marks...</div>;

  return (
    <>
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Student Marks & Eligibility</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="p-2 border">Student ID</th>
              <th className="p-2 border">Semester</th>
              <th className="p-2 border">Section</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Attendance (%)</th>
              <th className="p-2 border">Assignment</th>
              <th className="p-2 border">Lab</th>
              <th className="p-2 border">Theory</th>
              <th className="p-2 border font-semibold">Eligibility</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const {
                studentId,
                semester,
                section,
                subject,
                attendance,
                marks,
              } = student;

              const attendancePercent = ((attendance.classesAttended / attendance.totalClassesConducted) * 100).toFixed(1);

              return (
                <tr key={studentId} className="hover:bg-gray-100">
                  <td className="p-2 border">{studentId}</td>
                  <td className="p-2 border">{semester}</td>
                  <td className="p-2 border">{section}</td>
                  <td className="p-2 border">{subject}</td>
                  <td className="p-2 border">{attendancePercent}%</td>
                  <td className="p-2 border">{marks.assignment}</td>
                  <td className="p-2 border">{marks.lab}</td>
                  <td className="p-2 border">{marks.theory}</td>
                  <td className="p-2 border font-semibold">
                    {calculateEligibility(student)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
      </div>
    </div>
    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleBack}>⬅️Back</button>
    </>
    
  );
};

export default StudentMarksTable;
