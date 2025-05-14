import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentMarksForm = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    classesAttended: '',
    totalClassesConducted: '',
    assignment: '',
    lab: '',
    aat: '',
    cie1: '',
    cie2: '',
    cie3: '',
  });

  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');

  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/table');
  };
  const handleBack = () => {
    navigate('/');
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

    if (!semester || !section || !subject) {
      toast.warning('Please select semester, section, and subject.');
      return;
    }

    const attendance = {
      classesAttended: Number(formData.classesAttended),
      totalClassesConducted: Number(formData.totalClassesConducted),
    };

    const marks = {
      assignment: Number(formData.assignment),
      lab: Number(formData.lab),
      aat: Number(formData.aat),
      cie1: Number(formData.cie1),
      cie2: Number(formData.cie2),
      cie3: Number(formData.cie3),
      theory:
        Number(formData.cie1) +
        Number(formData.cie2) +
        Number(formData.cie3),
    };

    const payload = {
      studentId: formData.studentId,
      semester,
      section,
      subject,
      attendance,
      marks,
    };

    try {
      const res = await fetch('http://localhost:5000/api/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        toast.success('✅ Marks submitted successfully!');
        setFormData({
          studentId: '',
          classesAttended: '',
          totalClassesConducted: '',
          assignment: '',
          lab: '',
          aat: '',
          cie1: '',
          cie2: '',
          cie3: '',
        });
      } else {
        toast.error('❌ Failed to submit. Try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Error submitting data.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 overflow-hidden relative">
      <button
        onClick={handleBack}
        className="absolute top-6 right-6 text-white bg-purple-700 hover:bg-purple-900 px-4 py-2 rounded shadow-md transition"
      >
        ← Back
      </button>

      <div className="w-[80vw] h-[80vh] bg-white border-4 border-black rounded-lg shadow-[0_0_30px_10px_rgba(128,0,128,0.5)] p-8 overflow-auto">
        <h2 className="text-4xl font-dancing text-center mb-4">Enter Marks</h2>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
          <select value={semester} onChange={(e) => setSemester(e.target.value)} required className="w-full border p-2 rounded">
            <option value="">Select Semester</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <select value={section} onChange={(e) => setSection(e.target.value)} required className="w-full border p-2 rounded">
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>

          <select value={subject} onChange={(e) => setSubject(e.target.value)} required className="w-full border p-2 rounded">
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Computer">Computer</option>
          </select>

          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="classesAttended"
              placeholder="Classes Attended"
              value={formData.classesAttended}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              name="totalClassesConducted"
              placeholder="Total Classes Conducted"
              value={formData.totalClassesConducted}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <input
            type="number"
            name="assignment"
            placeholder="Assignment Marks"
            value={formData.assignment}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="lab"
            placeholder="Lab Marks"
            value={formData.lab}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="aat"
            placeholder="AAT Marks"
            value={formData.aat}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="cie1"
            placeholder="CIE 1 Marks"
            value={formData.cie1}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="cie2"
            placeholder="CIE 2 Marks"
            value={formData.cie2}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="cie3"
            placeholder="CIE 3 Marks"
            value={formData.cie3}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div className="text-center">
            <button
              type="submit"
              className="bg-black text-white w-full py-2 rounded hover:bg-purple-900 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleViewAll}
              className="mt-2 text-white hover:underline bg-black w-full py-2 rounded hover:bg-purple-900 transition">
                View All Students
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default StudentMarksForm;
