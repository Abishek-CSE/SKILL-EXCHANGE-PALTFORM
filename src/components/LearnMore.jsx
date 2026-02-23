import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiShield, 
  FiAward, 
  FiDollarSign, 
  FiUsers, 
  FiGlobe, 
  FiZap,
  FiStar,
  FiHeart,
  FiTrendingUp,
  FiLock,
  FiCheckCircle,
  FiArrowRight
} from "react-icons/fi";

const LearnMore = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Skill Escrow",
      description: "Your credits are safely escrowed during the exchange process to ensure fairness and protect both parties.",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Trust Score",
      description: "Earn reputation points for successful exchanges and high ratings. Build your credibility in the community.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Zero Fiat",
      description: "Built on a pure barter layer. Knowledge is the only currency here. No money involved, just skills.",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Global Community",
      description: "Connect with developers worldwide. Exchange skills across borders without currency barriers.",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: "Decentralized",
      description: "Powered by blockchain technology ensuring transparency, security, and true ownership of your reputation.",
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600"
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Instant Matching",
      description: "Our AI-powered algorithm matches you with the perfect skill partners based on your expertise and goals.",
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50",
      iconColor: "text-rose-600"
    }
  ];

  const stats = [
    { label: "Active Users", value: "2,847", icon: FiUsers, color: "from-indigo-500 to-purple-500" },
    { label: "Skills Exchanged", value: "15,342", icon: FiTrendingUp, color: "from-emerald-500 to-teal-500" },
    { label: "Success Rate", value: "98%", icon: FiStar, color: "from-amber-500 to-orange-500" },
    { label: "Community Rating", value: "4.8/5", icon: FiHeart, color: "from-rose-500 to-pink-500" }
  ];

  const steps = [
    {
      number: "01",
      title: "Create Profile",
      description: "Sign up and list the skills you can teach and what you want to learn.",
      icon: "📝"
    },
    {
      number: "02",
      title: "Find Matches",
      description: "Browse through our community and find developers with complementary skills.",
      icon: "🔍"
    },
    {
      number: "03",
      title: "Send Proposal",
      description: "Reach out with a skill exchange proposal and agree on terms.",
      icon: "📨"
    },
    {
      number: "04",
      title: "Exchange & Earn",
      description: "Complete the exchange, rate each other, and earn reputation points.",
      icon: "⭐"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-50 pt-24 pb-12">
      
      {/* Hero Section with Gradient */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-200/30 to-rose-200/30 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-8 border border-indigo-200"
            >
              <FiZap className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-600">The Future of Skill Exchange</span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                About SkillBar
              </span>
              <br />
              <span className="text-slate-900">Protocol</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto"
            >
              SkillBar is a peer-to-peer skill exchange platform that uses a decentralized credit system 
              to empower users to share knowledge without currency barriers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <button
                onClick={() => navigate("/register")}
                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
              >
                Get Started
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/explore")}
                className="px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all border border-slate-200 shadow-lg"
              >
                Explore Community
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-24"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl shadow-lg text-white`}
            >
              <stat.icon className="w-8 h-8 mb-3 opacity-90" />
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Choose SkillBar?
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Discover the features that make SkillBar the premier platform for skill exchange
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all p-8 overflow-hidden"
            >
              {/* Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <div className={feature.iconColor}>
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Element */}
              <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-5 rounded-full translate-x-8 translate-y-8`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Get started with SkillBar in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="text-center relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-white/20" />
                )}
                
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center text-3xl">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                    {step.number}
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-white/70">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Trusted by Developers
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their skills
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + index * 0.1 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-lg p-8"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar key={star} className="w-5 h-5 text-amber-500 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-600 mb-6">
                "SkillBar completely transformed how I learn. I traded my React knowledge for Python skills, and now I'm a full-stack developer!"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-slate-900">John Doe</p>
                  <p className="text-xs text-slate-400">React Developer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-500">
            Got questions? We've got answers.
          </p>
        </motion.div>

        <div className="space-y-4">
          {[
            {
              q: "How does the credit system work?",
              a: "Credits are earned by completing skill exchanges. Each successful exchange adds credits to your wallet, which you can use to request skills from others."
            },
            {
              q: "Is SkillBar really free?",
              a: "Yes! SkillBar is completely free. We believe in the power of knowledge sharing without financial barriers."
            },
            {
              q: "How do I get started?",
              a: "Simply create an account, list the skills you can teach and want to learn, and start connecting with other developers."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1 + index * 0.1 }}
              className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {faq.q}
                </h3>
                <FiLock className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </div>
              <p className="text-sm text-slate-500 mt-2">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4 }}
        className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 text-center"
      >
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already exchanging skills and growing together.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-slate-100 transition-all shadow-xl inline-flex items-center gap-2 group"
          >
            Create Free Account
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="w-4 h-4" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCheckCircle className="w-4 h-4" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCheckCircle className="w-4 h-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LearnMore;