const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-dancing mb-6">SEE Eligibility Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <Card title="Assignment" description="Average of all submitted assignment scores contributing to internal marks." />
        <Card title="Lab" description="Includes practical lab work and experiments marked throughout the semester." />
        <Card title="Theory" description="Continuous internal assessments like quizzes, midterms, and tests." />
      </div>
    </div>
  );
};

const Card = ({ title, description }) => (
  <div className="bg-white rounded-full shadow-xl p-6 border border-gray-300 text-center hover:shadow-2xl transition-all duration-300">
    <h2 className="font-dancing text-2xl mb-2">{title}</h2>
    <p className="text-sm text-gray-700">{description}</p>
  </div>
);

export default Home;
