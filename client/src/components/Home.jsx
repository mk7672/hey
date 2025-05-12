const Home = () => {
  return (
    <div className="flex flex-col items-center px-4 bg-gray-200 mt-20 py-10 w-3/4 h-[70vh] mx-auto rounded-xl">
      <h1 className="text-3xl md:text-8xl font-dancing text-center mt-20">
        SEE Eligibility Calculator
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 w-full px-6">
        <Card 
          title="Assignment" 
          description="Average of all submitted assignment scores contributing to internal marks." 
        />
        <Card 
          title="Lab" 
          description="Includes practical lab work and experiments marked throughout the semester." 
        />
        <Card 
          title="Theory" 
          description="Continuous internal assessments like quizzes, midterms, and tests." 
        />
      </div>
    </div>
  );
};

const Card = ({ title, description }) => (
  <div className="bg-white rounded-2xl p-6 border-4 border-black shadow-2xl shadow-red-700 transition duration-300 text-center w-64 h-64 flex flex-col justify-center mx-auto">
    <h2 className="font-dancing text-5xl mb-3">{title}</h2>
    <p className="text-xl text-gray-700">{description}</p>
  </div>
);

export default Home;
