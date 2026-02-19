import { useNavigate } from "react-router-dom";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 mt-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About SkillBar Protocol</h1>
        <p className="text-xl text-gray-600 mb-12">
          SkillBar is a peer-to-peer skill exchange platform that uses a decentralized credit system to empower users to share knowledge without currency barriers.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-3xl mb-4">🔒</div>
          <h3 className="text-xl font-bold mb-2">Skill Escrow</h3>
          <p className="text-gray-500">Your credits are safely escrowed during the exchange process to ensure fairness.</p>
        </div>
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-3xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-2">Trust Score</h3>
          <p className="text-gray-500">Earn reputation points for successful exchanges and high ratings.</p>
        </div>
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-3xl mb-4">💎</div>
          <h3 className="text-xl font-bold mb-2">Zero Fiat</h3>
          <p className="text-gray-500">Built on a pure barter layer. Knowledge is the only currency here.</p>
        </div>
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-2xl font-bold mb-8">Ready to get started?</h2>
        <button 
          onClick={() => navigate("/register")}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          Join the Network
        </button>
      </div>
    </div>
  );
};

export default LearnMore;
