import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { 
  FiSearch, 
  FiFilter, 
  FiStar, 
  FiClock, 
  FiAward,
  FiSend,
  FiTrendingUp,
  FiUsers,
  FiBriefcase,
  FiCode,
  FiMapPin,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";

// Import images
import banner1 from '../assets/images/Banner1.png';
import banner2 from '../assets/images/Banner2.png';
import banner3 from '../assets/images/Banner3.png';
import Janani from '../assets/images/Janani.jpeg';
import Bala from '../assets/images/Bala.jpeg';
import Naveena from '../assets/images/Naveena.jpeg';
import Abishek from '../assets/images/Abishek.jpeg';
import kuben from '../assets/images/Kuben.jpeg';

const MOCK_USERS = [
  {
    id: 1,
    name: "Abishek N",
    role: "React Developer",
    offers: ["React", "Express", "Node.js"],
    needs: ["SpringBoot", "Core Java", "Microservices"],
    rating: 4.8,
    reviews: 124,
    credits: 12,
    availability: "10 hrs/week",
    image: Abishek,
    location: "Chennai, IN",
    level: "Advanced",
    completed: 45,
    verified: true
  },
  {
    id: 2,
    name: "Bala Mukund",
    role: "Full Stack Dev",
    offers: ["Node.js", "MongoDB", "Express"],
    needs: ["AI/ML", "SEO", "Python"],
    rating: 4.9,
    reviews: 89,
    credits: 8,
    availability: "5 hrs/week",
    image: Bala,
    location: "Bangalore, IN",
    level: "Expert",
    completed: 78,
    verified: true
  },
  {
    id: 3,
    name: "Naveena",
    role: "Java Developer",
    offers: ["SpringBoot", "Core Java", "Hibernate"],
    needs: ["React", "Redux", "TypeScript"],
    rating: 4.7,
    reviews: 56,
    credits: 15,
    availability: "8 hrs/week",
    image: Naveena,
    location: "Hyderabad, IN",
    level: "Intermediate",
    completed: 23,
    verified: true
  },
  {
    id: 4,
    name: "Janani",
    role: "FrontEnd Developer",
    offers: ["Flutter", "JavaScript", "React Native"],
    needs: ["UI/UX Design", "Figma", "Adobe XD"],
    rating: 4.6,
    reviews: 42,
    credits: 5,
    availability: "12 hrs/week",
    image: Janani,
    location: "Pune, IN",
    level: "Intermediate",
    completed: 31,
    verified: true
  },
  {
    id: 5,
    name: "Kubendiran",
    role: "MERN Developer",
    offers: ["React", "Express", "MongoDB"],
    needs: ["UI/UX Design", "Figma", "Tailwind"],
    rating: 4.3,
    reviews: 28,
    credits: 5,
    availability: "16 hrs/week",
    image: kuben,
    location: "Mumbai, IN",
    level: "Advanced",
    completed: 19,
    verified: true
  }
];

const CAROUSEL_IMAGES = [
  {
    url: banner1,
    title: "Master Your Skills",
    subtitle: "Exchange coding expertise with global developers.",
    gradient: "from-blue-600/90 to-purple-600/90"
  },
  {
    url: banner2,
    title: "Design Your Future",
    subtitle: "Connect with creative minds to sharpen your expertise.",
    gradient: "from-purple-600/90 to-pink-600/90"
  },
  {
    url: banner3,
    title: "The Skill Marketplace",
    subtitle: "The world's first decentralized intelligence exchange.",
    gradient: "from-emerald-600/90 to-teal-600/90"
  }
];

const Explore = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("Skillbar") || "null");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    let filtered = MOCK_USERS.filter(user => {
      const matchesSearch = searchQuery === "" || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.offers.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        user.needs.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLevel = selectedLevel === "all" || user.level.toLowerCase() === selectedLevel.toLowerCase();

      return matchesSearch && matchesLevel;
    });

    // Sort users
    filtered.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      if (sortBy === "credits") return b.credits - a.credits;
      return 0;
    });

    return filtered;
  }, [searchQuery, selectedLevel, sortBy]);

  const handleProposal = useCallback((user) => {
    if (!currentUser) {
      toast.error("Please login to send proposals", {
        icon: "🔐",
        duration: 3000
      });
      navigate("/login");
      return;
    }

    const proposals = JSON.parse(localStorage.getItem("skillbar_proposals") || "[]");
    
    // Check if proposal already exists
    const existingProposal = proposals.find(p => 
      p.from === currentUser.name && p.to === user.name && p.status === "Pending"
    );

    if (existingProposal) {
      toast.error("Proposal already pending with this user", {
        icon: "⏳",
        duration: 3000
      });
      return;
    }

    proposals.push({
      id: Date.now(),
      from: currentUser.name,
      to: user.name,
      status: "Pending",
      timestamp: new Date().toISOString(),
      message: "Skill exchange proposal"
    });

    localStorage.setItem("skillbar_proposals", JSON.stringify(proposals));
    
    toast.success(
      <div>
        <p className="font-semibold">Proposal sent to {user.name}</p>
        <p className="text-xs opacity-90">They'll respond within 24h</p>
      </div>,
      {
        icon: "📨",
        duration: 4000
      }
    );
  }, [currentUser, navigate]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-24 pb-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-16 rounded-3xl overflow-hidden shadow-2xl h-[500px] group"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src={CAROUSEL_IMAGES[currentSlide].url} 
                alt="Banner" 
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${CAROUSEL_IMAGES[currentSlide].gradient} mix-blend-multiply`} />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center px-12 md:px-20">
                <div className="max-w-2xl">
                  <motion.span
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold mb-6 border border-white/30"
                  >
                    Welcome to Skillbar
                  </motion.span>
                  
                  <motion.h1 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                  >
                    {CAROUSEL_IMAGES[currentSlide].title}
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-white/90 mb-8"
                  >
                    {CAROUSEL_IMAGES[currentSlide].subtitle}
                  </motion.p>
                  
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-4"
                  >
                    <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors shadow-xl">
                      Get Started
                    </button>
                    <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30">
                      Learn More
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {CAROUSEL_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 ${
                  currentSlide === idx 
                    ? "w-8 h-3 bg-white rounded-full" 
                    : "w-3 h-3 bg-white/40 rounded-full hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: "Active Users", value: "2,847", icon: FiUsers, color: "blue" },
            { label: "Skills Exchanged", value: "15,342", icon: FiTrendingUp, color: "emerald" },
            { label: "Success Rate", value: "98%", icon: FiAward, color: "purple" },
            { label: "Avg. Response", value: "2.4h", icon: FiClock, color: "orange" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-${stat.color}-50 rounded-lg`}>
                  <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                </div>
                <span className="text-sm text-slate-500">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, skill, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-6 py-4 bg-white border border-slate-200 rounded-xl flex items-center gap-2 hover:border-blue-500 transition-colors"
            >
              <FiFilter className="w-5 h-5 text-slate-600" />
              <span className="font-medium">Filters</span>
            </button>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="credits">Most Credits</option>
            </select>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-6 bg-white rounded-xl border border-slate-200"
              >
                <h3 className="font-semibold text-slate-900 mb-4">Filter by Level</h3>
                <div className="flex gap-3">
                  {["all", "beginner", "intermediate", "advanced", "expert"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-4 py-2 rounded-lg capitalize ${
                        selectedLevel === level
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between items-center mb-6"
        >
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-900">{filteredUsers.length}</span> developers
          </p>
          <p className="text-xs text-slate-400">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </motion.div>

        {/* User Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredUsers.map((user, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                key={user.id}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                {/* Card Header */}
                <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
                  <div className="absolute -bottom-12 left-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-xl border-4 border-white shadow-lg overflow-hidden">
                        <img 
                          src={user.image} 
                          alt={user.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {user.verified && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                          <FiAward className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="pt-16 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{user.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{user.role}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <FiStar className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold">{user.rating}</span>
                      <span className="text-xs text-slate-400">({user.reviews})</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-slate-500">
                    <FiMapPin className="w-4 h-4" />
                    {user.location}
                  </div>

                  {/* Skills */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Offers
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {user.offers.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Seeks
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {user.needs.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-lg"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-50 p-3 rounded-xl text-center">
                      <p className="text-xs text-slate-400 mb-1">Level</p>
                      <p className="font-semibold text-slate-900 capitalize">{user.level}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl text-center">
                      <p className="text-xs text-slate-400 mb-1">Completed</p>
                      <p className="font-semibold text-slate-900">{user.completed}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl text-center">
                      <p className="text-xs text-slate-400 mb-1">Credits</p>
                      <p className="font-semibold text-slate-900">{user.credits}</p>
                    </div>
                  </div>

                  {/* Availability and Action */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <FiClock className="w-4 h-4" />
                      {user.availability}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiBriefcase className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-400">Available</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleProposal(user)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    <FiSend className="w-4 h-4" />
                    Send Proposal
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No developers found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedLevel("all");
              }}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredUsers.length > 0 && filteredUsers.length < MOCK_USERS.length && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-white border border-slate-200 rounded-xl font-semibold hover:border-blue-500 transition-colors">
              Load More Developers
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;