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

          <select value={subject} onChange={(e) => setSubject(e.target.value)} required className="w-full border p-2 rounded">
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Computer">Computer</option>
          </select>

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
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PostLoginHome;
