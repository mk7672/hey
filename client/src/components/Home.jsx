const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-7xl font-dancing mb-20 mt-20">SEE Eligibility Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <Card title="Assignment" description="Average of all submitted assignment scores contributing to internal marks." />
        <Card title="Lab" description="Includes practical lab work and experiments marked throughout the semester." />
        <Card title="Theory" description="Continuous internal assessments like quizzes, midterms, and tests." />
      </div>
    </div>
  );
};

const Card = ({ title, description }) => (
  <div className="bg-white rounded-full p-8 border-4 border-black shadow-lg shadow-red-500 text-center hover:shadow-red-600 hover:shadow-2xl transition-all duration-300">
    <h2 className="font-dancing text-4xl mb-4">{title}</h2>
    <p className="text-lg text-gray-700">{description}</p>
  </div>
);


export default Home;
