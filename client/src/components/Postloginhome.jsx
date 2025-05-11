import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostLoginHome = () => {
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState(''); // ✅ New state for subject
  const navigate = useNavigate();

  const handleNext = () => {
    if (semester && section && subject) {
      navigate(`/marks-form?semester=${semester}&section=${section}&subject=${encodeURIComponent(subject)}`);
    } else {
      alert('Please select semester, section, and enter subject name');
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="h-[90vh] w-[90vw] bg-white border-4 border-black rounded-lg shadow-[0_0_40px_10px_rgba(128,0,128,0.5)] p-10 text-center overflow-auto">
        <h1 className="text-7xl font-dancing mt-8 mb-8">SEE Eligibility Calculator</h1>

        <p className="text-gray-700 mb-2">
          This tool helps determine student eligibility for semester-end exams.
        </p>
        <p className="text-gray-700 mb-6">
          Enter the semester, section, and subject to proceed to the marks submission page.
        </p>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select Semester</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">-- Choose Semester --</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select Section</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            <option value="">-- Choose Section --</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
          </select>
        </div>

        {/* ✅ Subject Input Field */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Enter Subject Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="e.g. Mathematics"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <button
          onClick={handleNext}
          className="bg-black text-white mt-5 px-6 py-2 rounded hover:bg-purple-900 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostLoginHome;
