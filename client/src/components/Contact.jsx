import { useState } from "react";

const Contact = () => {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
  };

  return (
    <>
 <div className="w-full max-w-lg mx-auto px-4 text-center"> 
      {/* Heading outside the box */}
      <h2 className="text-8xl font-dancing mt-20 mb-5 ">Contact Us</h2>

      {/* Content box */}
      <div className="border-4 border-black p-8 rounded-lg shadow-lg shadow-red-500 space-y-4 mt-20">
        <p className="text-2xl"><b>Email:</b> support@example.com</p>
        <p className="text-2xl"><b>Phone:</b> +91 98765 43210</p>

        {/* Text area */}
        <textarea
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Type your message here..."
          rows="4"
        ></textarea>

        {/* Message sent text */}
        {messageSent && (
          <p className="text-green-600 font-semibold">Message sent!</p>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>
    </div> 
    </>
  );
};

export default Contact;

