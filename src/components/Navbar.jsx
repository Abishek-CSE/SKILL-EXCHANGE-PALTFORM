import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("Skillbar"));
  const [isHovered, setIsHovered] = useState(null);

  const navLinks = [
    { name: "Explore", path: "/" },
    ...(user ? [
      { name: "Dashboard", path: "/dashboard" },
      { name: "My Skills", path: "/skill" }
    ] : [])
  ];

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-6 pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-[2.5rem] px-8 h-20 flex items-center justify-between pointer-events-auto border border-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] relative overflow-hidden"
      >
        {/* Unique Logo Section */}
        <NavLink to="/" className="flex items-center gap-4 group relative z-10">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-100 blur-lg opacity-40"
            />
            <div className="relative w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
               <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-blue-300">S</span>
            </div>
          </div>
          <div className="flex flex-col">
             <span className="text-xl font-black text-slate-900 tracking-tighter leading-none uppercase">
              Skill<span className="text-blue-600">Bar</span>
            </span>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 group-hover:text-blue-600 transition-colors">Decentralized</span>
          </div>
        </NavLink>

        {/* Balanced Navigation Links */}
        <div className="hidden md:flex items-center gap-2 relative z-10">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path}
              to={link.path}
              onMouseEnter={() => setIsHovered(link.path)}
              onMouseLeave={() => setIsHovered(null)}
              className={({ isActive }) => `
                relative px-6 py-2.5 rounded-full text-sm font-bold tracking-tight transition-all duration-300
                ${isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-900"}
              `}
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="active-nav"
                      className="absolute inset-0 bg-blue-50 rounded-full -z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isHovered === link.path && !isActive && (
                    <motion.div 
                      layoutId="hover-nav"
                      className="absolute inset-0 bg-slate-50 rounded-full -z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right Action Section */}
        <div className="flex items-center gap-4 relative z-10">
          {!user ? (
            <div className="flex items-center gap-3">
              <NavLink
                to="/login"
                className="text-slate-600 hover:text-slate-900 font-bold text-sm px-4 py-2 transition-colors"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="bg-slate-900 text-white font-bold text-sm px-7 py-3.5 rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center gap-2"
              >
                Join Free <span className="text-xs">→</span>
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
               <div className="hidden sm:flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Assets</span>
                <motion.div 
                   whileHover={{ scale: 1.05 }}
                   className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100"
                >
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <p className="text-xs text-blue-800 font-black tracking-tight">{user.wallet?.total || 0} Credits</p>
                </motion.div>
              </div>
              <NavLink 
                to="/profile" 
                className="relative group flex items-center justify-center w-12 h-12"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative w-full h-full rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-blue-600 font-black shadow-lg group-hover:scale-105 group-hover:-rotate-3 transition-all overflow-hidden">
                  {user.name ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 uppercase">
                      {user.name.charAt(0)}
                    </div>
                  ) : (
                    "U"
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full z-20 shadow-lg" />
              </NavLink>
            </div>
          )}
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
