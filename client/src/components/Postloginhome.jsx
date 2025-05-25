import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostLoginHome = () => {
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (semester && section && subject) {
      navigate(
        `/marks-form/all?semester=${semester}&section=${section}&subject=${encodeURIComponent(subject)}`
      );
    } else {
      toast.warn('Please select semester, section, and subject.', {
        position: 'top-center',
        autoClose: 2500,
      });
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-100">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Scrollable Content */}
      <div className="pt-20 px-8 flex justify-center items-center">
        <div className="h-[90vh] w-[90vw] bg-white border-4 border-black rounded-lg shadow-[0_0_40px_10px_rgba(128,0,128,0.5)] p-10 text-center overflow-auto">
          <h1 className="text-7xl font-dancing mt-8 mb-8">SEE Eligibility Calculator</h1>

          <p className="text-gray-700 mb-2">
            This tool helps determine student eligibility for semester-end exams.
          </p>
          <p className="text-gray-700 mb-6">
            Enter the semester, section, and subject to proceed to the marks submission page.
          </p>

          {/* Dropdowns */}
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

          <div className="mb-10">
            <label className="block mb-2 font-semibold">Select Subject</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">-- Choose Subject --</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="English">English</option>
              {/* Add more subjects as needed */}
            </select>
          </div>

          {/* Next Button */}
          <div className="mt-10">
            <button
              onClick={handleNextClick}
              className="px-8 py-4 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-900 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLoginHome;
