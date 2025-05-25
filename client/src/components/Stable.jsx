import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentMarksTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const calculateEligibility = (student) => {
    const { classesAttended, totalClassesConducted } = student.attendance || {};
    const { theory = 0, lab = 0, assignment = 0 } = student.marks || {};

    if (!classesAttended || !totalClassesConducted) return '❌ No Data';

    const attendancePercent = (classesAttended / totalClassesConducted) * 100;

    return attendancePercent >= 85 && theory >= 6 && assignment >= 6 && lab >= 6 && aat >= 6
      ? '✅ Eligible'
      : '❌ Not Eligible';
  };

  const handleBack = () => {
    navigate('/pl');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/students', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Unauthorized or fetch failed');
        const data = await res.json();

        if (!Array.isArray(data)) throw new Error('Invalid response format');

        setStudents(data);
      } catch (err) {
        console.error('Error fetching student data:', err);
        setStudents([]);
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
          <table className="min-w-full border border-gray-300 text-sm text-left bg-white shadow rounded">
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
              {students.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center p-4">
                    No student data available.
                  </td>
                </tr>
              ) : (
                students.map((student, index) => {
                  const {
                    studentId,
                    semester,
                    section,
                    subject,
                    attendance = {},
                    marks = {},
                  } = student;

                  const attendancePercent =
                    attendance.totalClassesConducted > 0
                      ? ((attendance.classesAttended / attendance.totalClassesConducted) * 100).toFixed(1)
                      : 'N/A';

                  return (
                    <tr key={`${studentId}-${subject}-${index}`} className="hover:bg-gray-100">
                      <td className="p-2 border">{studentId}</td>
                      <td className="p-2 border">{semester}</td>
                      <td className="p-2 border">{section}</td>
                      <td className="p-2 border">{subject}</td>
                      <td className="p-2 border">{attendancePercent}%</td>
                      <td className="p-2 border">{marks.assignment ?? 'N/A'}</td>
                      <td className="p-2 border">{marks.lab ?? 'N/A'}</td>
                      <td className="p-2 border">{marks.theory ?? 'N/A'}</td>
                      <td className="p-2 border font-semibold">{calculateEligibility(student)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
          onClick={handleBack}
        >
          ⬅️ Back
        </button>
      </div>
    </>
  );
};

export default StudentMarksTable;
