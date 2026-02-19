import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("skillbar_profile_image") || null
  );

  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("Skillbar");
    return saved ? JSON.parse(saved) : null;
  });

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("skillbar_profile");
    const user = JSON.parse(localStorage.getItem("Skillbar") || "{}");
    
    return saved
      ? { ...user, ...JSON.parse(saved) }
      : {
          ...user,
          fullName: user?.name || "",
          username: user?.email?.split("@")[0] || "",
          role: user?.role || "Skill Specialist",
          bio: "",
          location: "",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          skillName: user?.skillName || "",
          category: "Technology",
          level: "Intermediate",
          experience: "1-3 Years",
          needSkill: user?.needSkill || "",
          priority: "High",
          preferredLevel: "Expert",
          goal: "Career Growth",
          hoursPerWeek: "10",
          days: ["Mon", "Wed"],
          sessionLength: "1h",
          responseSLA: "24h",
          wallet: user?.wallet || { total: 0, earned: 0, spent: 0, locked: 0 },
          reputation: user?.reputation || {
            rating: 0,
            completed: 0,
            completionRate: "0%",
            disputes: 0,
          },
          github: "",
          portfolio: "",
          identityVerified: false
        };
  });

  const [activeSection, setActiveSection] = useState("identity");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userData) {
      setProfile(prev => ({
        ...prev,
        fullName: prev.fullName || userData.name || "",
        email: prev.email || userData.email || "",
        role: prev.role || userData.role || "Specialist",
        wallet: userData.wallet || prev.wallet,
        reputation: userData.reputation || prev.reputation
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image too large (Max 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      localStorage.setItem("skillbar_profile_image", reader.result);
      toast.success("Profile image updated");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    localStorage.setItem("skillbar_profile", JSON.stringify(profile));
    setIsSubmitting(false);
    toast.success("Profile saved successfully");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully");
    setTimeout(() => window.location.href = "/login", 1000);
  };

  const sections = [
    { id: "identity", label: "Identity", icon: "👤" },
    { id: "skills", label: "Skills", icon: "🎯" },
    { id: "availability", label: "Availability", icon: "⏱️" },
    { id: "wallet", label: "Wallet", icon: "💎" },
    { id: "proofs", label: "Proofs", icon: "📂" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-20 px-4 md:px-12 flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row min-h-[800px]"
        >
          {/* Side Navigation */}
          <div className="lg:w-80 bg-slate-50 border-r border-slate-100 p-10 flex flex-col relative z-10">
            <div className="mb-12 text-center">
              <div className="relative inline-block group">
                <div className="w-28 h-28 rounded-[2.5rem] bg-slate-900 p-1.5 shadow-xl transition-transform group-hover:scale-105 duration-500">
                  <div className="w-full h-full rounded-[2rem] bg-white overflow-hidden flex items-center justify-center border-4 border-white">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-black text-slate-300 uppercase">
                        {profile.fullName?.charAt(0) || "U"}
                      </span>
                    )}
                  </div>
                </div>
                <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 text-white border-4 border-white rounded-2xl flex items-center justify-center cursor-pointer hover:bg-slate-900 transition-colors shadow-lg">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" /></svg>
                   <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
              <h2 className="mt-6 text-2xl font-black text-slate-900 tracking-tighter uppercase">{profile.fullName || "Incognito"}</h2>
              <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-[9px] mt-1">{profile.role}</p>
            </div>

            <nav className="space-y-3 flex-grow">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full group flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-300 relative ${
                    activeSection === sec.id 
                    ? "bg-white text-slate-900 shadow-xl shadow-slate-200/50 translate-x-2" 
                    : "text-slate-400 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  <span className={`text-xl transition-transform duration-500 ${activeSection === sec.id ? "scale-110" : "group-hover:scale-110"}`}>{sec.icon}</span>
                  <span className="font-black text-[10px] uppercase tracking-widest">{sec.label}</span>
                  {activeSection === sec.id && <motion.div layoutId="activeInd" className="absolute left-[-15px] w-1.5 h-8 bg-blue-600 rounded-full" />}
                </button>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="mt-12 group flex items-center gap-4 px-6 py-4 rounded-[1.5rem] text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all"
            >
              <span className="text-xl">🚪</span>
              Logout
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-grow p-12 lg:p-20 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <div className="mb-16">
                  <h3 className="text-6xl font-black text-slate-900 tracking-tighter mb-4 leading-none uppercase">
                    {activeSection} <span className="text-blue-600">Settings</span>
                  </h3>
                  <p className="text-slate-400 font-bold tracking-widest text-[10px] uppercase ml-1 italic">Update your public presence and skill metrics</p>
                </div>

                <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
                  {activeSection === "identity" && (
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Legal Name</label>
                        <input name="fullName" value={profile.fullName} onChange={handleChange} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-900 transition-all" placeholder="Enter name" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Network Username</label>
                        <input name="username" value={profile.username} onChange={handleChange} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-900 transition-all" placeholder="@username" />
                      </div>
                      <div className="space-y-4 md:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Short Bio</label>
                        <textarea name="bio" value={profile.bio} onChange={handleChange} rows="4" className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-900 transition-all resize-none leading-relaxed" placeholder="Tell us about yourself..." />
                      </div>
                    </div>
                  )}

                  {activeSection === "skills" && (
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full -mr-12 -mt-12 blur-xl" />
                        <h4 className="text-emerald-700 font-black text-[10px] uppercase tracking-widest mb-8">What You Teach</h4>
                        <div className="space-y-6">
                           <input name="skillName" value={profile.skillName} onChange={handleChange} placeholder="Skill name" className="w-full bg-white px-6 py-4 rounded-2xl border border-emerald-100 font-bold text-slate-900 outline-none focus:border-emerald-500 transition-colors" />
                           <select name="level" value={profile.level} onChange={handleChange} className="w-full bg-white px-6 py-4 rounded-2xl border border-emerald-100 font-bold text-slate-900 outline-none focus:border-emerald-500 transition-colors appearance-none">
                             <option>Beginner</option>
                             <option>Intermediate</option>
                             <option>Expert</option>
                           </select>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12 blur-xl" />
                        <h4 className="text-blue-700 font-black text-[10px] uppercase tracking-widest mb-8">What You Need</h4>
                        <div className="space-y-6">
                           <input name="needSkill" value={profile.needSkill} onChange={handleChange} placeholder="Skill name" className="w-full bg-white px-6 py-4 rounded-2xl border border-blue-100 font-bold text-slate-900 outline-none focus:border-blue-500 transition-colors" />
                           <select name="priority" value={profile.priority} onChange={handleChange} className="w-full bg-white px-6 py-4 rounded-2xl border border-blue-100 font-bold text-slate-900 outline-none focus:border-blue-500 transition-colors appearance-none">
                             <option>Low</option>
                             <option>Normal</option>
                             <option>High</option>
                           </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "availability" && (
                    <div className="space-y-12">
                       <div>
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-6 block">Weekly Committment</label>
                         <input type="range" name="hoursPerWeek" value={profile.hoursPerWeek} onChange={handleChange} min="0" max="40" step="5" className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600" />
                         <div className="flex justify-between mt-6">
                           <span className="text-5xl font-black text-slate-900 tracking-tighter">{profile.hoursPerWeek} <span className="text-xl text-slate-300 uppercase italic">hrs/week</span></span>
                         </div>
                       </div>
                       <div className="grid grid-cols-7 gap-3">
                         {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                           <button key={day} type="button" onClick={() => {
                             const days = profile.days.includes(day) ? profile.days.filter(d => d !== day) : [...profile.days, day];
                             setProfile(prev => ({ ...prev, days }));
                           }} className={`h-24 rounded-[1.5rem] flex flex-col items-center justify-center transition-all duration-300 gap-2 border shadow-sm ${profile.days.includes(day) ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-400 border-slate-100 hover:border-slate-300"}`}>
                             <span className="text-[10px] font-black uppercase tracking-widest">{day}</span>
                             <div className={`w-1.5 h-1.5 rounded-full ${profile.days.includes(day) ? "bg-blue-400" : "bg-slate-200"}`} />
                           </button>
                         ))}
                       </div>
                    </div>
                  )}

                  {activeSection === "wallet" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                       {[
                         { label: "Available Credits", val: profile.wallet.total, color: "blue" },
                         { label: "Total Earned", val: profile.wallet.earned, color: "emerald" },
                         { label: "Total Spent", val: profile.wallet.spent, color: "red" },
                         { label: "Locked Escrow", val: profile.wallet.locked, color: "orange" }
                       ].map((item, i) => (
                         <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:bg-white hover:shadow-xl transition-all">
                           <div className={`absolute top-0 left-0 w-1 h-full bg-${item.color}-500`} />
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
                           <p className="text-4xl font-black text-slate-900 tracking-tighter">{item.val}</p>
                         </div>
                       ))}
                       <div className="md:col-span-2 lg:col-span-4 mt-8 bg-slate-900 p-10 rounded-[3rem] text-white flex items-center justify-between group overflow-hidden relative shadow-2xl">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-2xl" />
                          <div className="relative z-10">
                            <h5 className="text-2xl font-black tracking-tighter mb-2 uppercase">Decentralized Trust Protocol</h5>
                            <p className="max-w-xl text-slate-400 font-bold text-xs leading-relaxed uppercase tracking-widest opacity-80 italic">Transactions are secured via peer-to-peer verification nodes. Trust level: High-Fidelity.</p>
                          </div>
                          <span className="text-5xl opacity-50 group-hover:scale-110 transition-transform">🛡️</span>
                       </div>
                    </div>
                  )}

                  {activeSection === "proofs" && (
                    <div className="grid md:grid-cols-2 gap-10">
                       <div className="space-y-8">
                          <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">GitHub Repository</label>
                            <input name="github" value={profile.github} onChange={handleChange} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] font-bold text-slate-900 outline-none" placeholder="https://github.com/..." />
                          </div>
                          <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Portfolio Link</label>
                            <input name="portfolio" value={profile.portfolio} onChange={handleChange} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] font-bold text-slate-900 outline-none" placeholder="https://yoursite.com" />
                          </div>
                       </div>
                       <div className="bg-slate-50 p-10 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-blue-500/50 hover:bg-white transition-all shadow-inner hover:shadow-2xl">
                          <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-3xl mb-6 group-hover:-translate-y-2 transition-transform">📎</div>
                          <h5 className="text-lg font-black text-slate-900 tracking-tight mb-2 uppercase">Upload Verification</h5>
                          <p className="text-slate-400 font-black text-[9px] uppercase tracking-widest px-10">Certifications, degrees, or ID proofs</p>
                       </div>
                    </div>
                  )}

                  <div className="mt-auto pt-16 flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="group relative px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-lg tracking-tighter overflow-hidden transition-all hover:pr-16 active:scale-95 shadow-2xl hover:bg-blue-600 disabled:opacity-50">
                      <span className="relative z-10">{isSubmitting ? "SAVING..." : "SAVE PROFILE"}</span>
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">→</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;