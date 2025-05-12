const Home = () => {
  return (
    <div className="min-h-screen flex flex-col  items-center px-4 bg-gray-200">
      <h1 className="text-6xl md:text-7xl font-dancing mt-5 text-center">
        SEE Eligibility Calculator
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl">
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
  <div className="bg-white rounded-2xl p-6 border-2 border-gray-300 shadow-md hover:shadow-xl transition duration-300 text-center">
    <h2 className="font-dancing text-3xl mb-3">{title}</h2>
    <p className="text-base text-gray-700">{description}</p>
  </div>
);

export default Home;
