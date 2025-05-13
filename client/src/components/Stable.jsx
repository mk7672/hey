import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentMarksTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const calculateEligibility = (student) => {
    const { classesAttended = 0, totalClassesConducted = 1 } = student.attendance || {};
    const { theory = 0, lab = 0, assignment = 0 } = student.marks || {};

    const attendancePercent = (classesAttended / totalClassesConducted) * 100;
    const totalMarks = theory + lab + assignment;

    return attendancePercent >= 85 && totalMarks >= 20 ? '✅ Eligible' : '❌ Not Eligible';
  };

  const handleBack = () => {
    navigate("/pl");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
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
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading student marks...</div>;
  }

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Student Marks & Eligibility</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-left">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="p-3">Student ID</th>
                <th className="p-3">Semester</th>
                <th className="p-3">Section</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Attendance (%)</th>
                <th className="p-3">Assignment</th>
                <th className="p-3">Lab</th>
                <th className="p-3">Theory</th>
                <th className="p-3">Eligibility</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                const eligibility = calculateEligibility(student);
                const { classesAttended, totalClassesConducted } = student.attendance || {};
                const attendancePercent = totalClassesConducted
                  ? ((classesAttended / totalClassesConducted) * 100).toFixed(2)
                  : "N/A";

                return (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-3">{student.studentId}</td>
                    <td className="p-3">{student.semester}</td>
                    <td className="p-3">{student.section}</td>
                    <td className="p-3">{student.subject}</td>
                    <td className="p-3">{attendancePercent}%</td>
                    <td className="p-3">{student.marks?.assignment}</td>
                    <td className="p-3">{student.marks?.lab}</td>
                    <td className="p-3">{student.marks?.theory}</td>
                    <td className="p-3">{eligibility}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleBack}
          className="mt-4 px-6 py-2 bg-purple-700 text-white rounded shadow hover:bg-purple-900 transition"
        >
          ← Back
        </button>
      </div>
    </>
  );
};

export default StudentMarksTable;
