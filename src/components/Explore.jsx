import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import banner1 from '../assets/images/Banner1.png'
import banner2 from '../assets/images/Banner2.png'
import banner3 from '../assets/images/Banner3.png'
import Janani from '../assets/images/Janani.jpeg'
import Bala from '../assets/images/Bala.jpeg'
import Naveena from '../assets/images/Naveena.jpeg'
import Abishek from '../assets/images/Abishek.jpeg'
import kuben from '../assets/images/Kuben.jpeg'

const MOCK_USERS = [
  {
    id: 1,
    name: "Abishek N",
    role: "React Developer",
    offers: "React, Express",
    needs: "SpringBoot, Core Java",
    rating: 4.8,
    credits: 12,
    availability: "10 hrs/week",
    image: Abishek
  },
  {
    id: 2,
    name: "Bala Mukund",
    role: "Full Stack Dev",
    offers: "Node.js, MongoDB",
    needs: "AI/ML, SEO",
    rating: 4.9,
    credits: 8,
    availability: "5 hrs/week",
    image: Bala
  },
  {
    id: 3,
    name: "Naveena",
    role: "Java Developer",
    offers: "SpringBoot, Core Java",
    needs: "React",
    rating: 4.7,
    credits: 15,
    availability: "8 hrs/week",
    image: Naveena
  },
  {
    id: 4,
    name: "Janani",
    role: "FrontEnd Developer",
    offers: "Flutter, JavaScript",
    needs: "UI/UX Design",
    rating: 4.6,
    credits: 5,
    availability: "12 hrs/week",
    image: Janani
  },
  {
    id: 5,
    name: "Kubendiran",
    role: "MERN Developer",
    offers: "React, Express",
    needs: "UI/UX Design",
    rating: 4.3,
    credits: 5,
    availability: "16 hrs/week",
    image: kuben
  }
];

const CAROUSEL_IMAGES = [
  {
    url: banner1,
    title: "Master Your Skills",
    subtitle: "Exchange coding expertise with global developers."
  },
  {
    url: banner2,
    title: "Design Your Future",
    subtitle: "Connect with creative minds to sharpen your expertise."
  },
  {
    url: banner3,
    title: "The Skill Marketplace",
    subtitle: "The world's first decentralized intelligence exchange."
  }
];

const Explore = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("Skillbar"));
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(MOCK_USERS);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const results = MOCK_USERS.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.offers.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchQuery]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleProposal = (user) => {
    if (!currentUser) {
      navigate("/register");
      return;
    }
    const proposals = JSON.parse(localStorage.getItem("skillbar_proposals") || "[]");
    proposals.push({
      id: Date.now(),
      from: currentUser.name,
      to: user.name,
      status: "Pending",
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("skillbar_proposals", JSON.stringify(proposals));
    toast.success(`Proposal sent to ${user.name}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-20 px-4 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Banner Carousel */}
        <div className="relative mb-24 rounded-[3.5rem] overflow-hidden shadow-2xl h-[400px] md:h-[500px] border border-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
              <img 
                src={CAROUSEL_IMAGES[currentSlide].url} 
                alt="Banner" 
                className="w-full h-full object-cover" 
              />
              
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-10 md:p-16">
                <motion.h2 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-none"
                >
                  {CAROUSEL_IMAGES[currentSlide].title}
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-white/90 max-w-2xl font-bold leading-relaxed opacity-90"
                >
                  {CAROUSEL_IMAGES[currentSlide].subtitle}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {CAROUSEL_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "bg-white w-8 shadow-lg" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Search Section */}
        <div className="text-center mb-16">
           <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-6 uppercase leading-none">Marketplace <span className="text-blue-600">Sync</span></h1>
           <div className="relative max-w-xl mx-auto group">
             <input
               type="text"
               placeholder="Search skills or roles..."
               className="w-full px-8 py-5 bg-white border border-slate-200 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-900 text-lg shadow-sm"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
             <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
               🔍
             </div>
           </div>
        </div>

        {/* Marketplace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredUsers.map((user) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={user.id} 
                className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all p-10 group relative flex flex-col"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-2 border-slate-50 shadow-inner transition-transform group-hover:scale-105 duration-500">
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none group-hover:text-blue-600 transition-colors">{user.name}</h3>
                    <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mt-2 ">{user.role}</p>
                  </div>
                </div>

                <div className="space-y-6 mb-10 flex-grow">
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1.5 ml-2">Offers Expertise</p>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 font-bold text-slate-700 text-sm">{user.offers}</div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1.5 ml-2">Seeking Skills</p>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 font-bold text-slate-700 text-sm">{user.needs}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-10 px-2 pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1.5">Reputation</p>
                    <p className="font-black text-slate-900 text-2xl tracking-tighter">{user.rating} <span className="text-blue-500 text-sm">★</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1.5">Availability</p>
                    <p className="font-black text-slate-900 text-sm uppercase tracking-tighter">{user.availability}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleProposal(user)}
                  className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95"
                >
                  Send Proposal
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-40 bg-white rounded-[4rem] border-2 border-dashed border-slate-200">
            <div className="text-8xl mb-8 grayscale opacity-20">🔎</div>
            <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest">No matching skills detected</h3>
            <p className="text-slate-500 mt-4 font-bold tracking-widest">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
