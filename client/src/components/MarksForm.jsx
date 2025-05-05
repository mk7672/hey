import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StudentMarksForm = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    assignment: '',
    lab: '',
    cie1: '',
    cie2: '',
    cie3: '',
  });

  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const semester = queryParams.get('semester');
  const section = queryParams.get('section');

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    const totalTheory =
      Number(formData.cie1) + Number(formData.cie2) + Number(formData.cie3);

    const payload = {
      studentId: formData.studentId,
      semester,
      section,
      marks: {
        assignment: Number(formData.assignment),
        lab: Number(formData.lab),
        theory: totalTheory,
        cie1: Number(formData.cie1),
        cie2: Number(formData.cie2),
        cie3: Number(formData.cie3),
      },
    };

    try {
      const res = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          studentId: '',
          assignment: '',
          lab: '',
          cie1: '',
          cie2: '',
          cie3: '',
        });
      } else {
        alert('Failed to submit. Try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting data.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 overflow-hidden relative">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="absolute top-6 right-6 text-white bg-purple-700 hover:bg-purple-900 px-4 py-2 rounded shadow-md transition"
      >
        ← Back
      </button>

      <div className="w-[80vw] h-[80vh] bg-white border-4 border-black rounded-lg shadow-[0_0_30px_10px_rgba(128,0,128,0.5)] p-8 overflow-auto">
        <h2 className="text-4xl font-dancing text-center mb-4">Enter Student Marks</h2>

        <div className="text-center text-lg font-semibold mb-6">
          Semester: <span className="text-purple-700">{semester}</span> | Section: <span className="text-purple-700">{section}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          {/* Form Inputs */}
          <input type="text" name="studentId" placeholder="Student ID" value={formData.studentId} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="number" name="assignment" placeholder="Assignment Marks (out of 10)" value={formData.assignment} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="number" name="lab" placeholder="Lab Marks (out of 10)" value={formData.lab} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="number" name="cie1" placeholder="CIE 1 Marks (out of 10)" value={formData.cie1} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="number" name="cie2" placeholder="CIE 2 Marks (out of 10)" value={formData.cie2} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="number" name="cie3" placeholder="CIE 3 Marks (out of 10)" value={formData.cie3} onChange={handleChange} className="w-full border p-2 rounded" required />

          {success && (
            <p className="text-green-600 text-center font-semibold">
              ✅ Marks submitted successfully!
            </p>
          )}

          <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-purple-900 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentMarksForm;
