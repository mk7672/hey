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

  const handleCardClick = (type) => {
    if (semester && section && subject) {
      navigate(`/marks-form/${type}?semester=${semester}&section=${section}&subject=${encodeURIComponent(subject)}`);
    } else {
      toast.warn('Please select semester, section, and enter subject name.', {
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

          {/* Dropdowns & Input */}
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
            <label className="block mb-2 font-semibold">Enter Subject Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="e.g. Mathematics"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* Functional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-6xl mx-auto">
            <Card 
              title="Assignment" 
              description="Average of all submitted assignment scores contributing to internal marks." 
              onClick={() => handleCardClick('assignment')} 
            />
            <Card 
              title="Lab" 
              description="Includes practical lab work and experiments marked throughout the semester." 
              onClick={() => handleCardClick('lab')} 
            />
            <Card 
              title="Theory" 
              description="Continuous internal assessments like quizzes, midterms, and tests." 
              onClick={() => handleCardClick('theory')} 
            />
          </div>

          {/* New Row with One Centered Card */}
          <div className="mt-14 flex justify-center">
            <div className="w-full max-w-sm">
              <Card 
                title="📊 View Final Eligibility Table"
                description="See all submitted marks and check eligibility status for each student."
                onClick={() => navigate("/table")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
const Card = ({ title, description, onClick }) => (
  <div 
    onClick={onClick}
    className="cursor-pointer bg-white rounded-2xl p-6 border-2 border-gray-300 shadow-md hover:shadow-xl transition duration-300 text-center"
  >
    <h2 className="font-dancing text-3xl mb-3">{title}</h2>
    <p className="text-base text-gray-700">{description}</p>
  </div>
);

export default PostLoginHome;
