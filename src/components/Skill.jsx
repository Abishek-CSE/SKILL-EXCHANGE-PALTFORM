import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const Skill = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("Skillbar") || "{}"));
  const [offering, setOffering] = useState(user.skillName || "");
  const [needing, setNeeding] = useState(user.needSkill || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    const updatedUser = { ...user, skillName: offering, needSkill: needing };
    localStorage.setItem("Skillbar", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    toast.success("Skill listings updated successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-20 px-4 md:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full -mr-40 -mt-40 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4 leading-none uppercase">
              My <span className="text-blue-600">Skills</span>
            </h1>
            <p className="text-slate-400 font-bold max-w-lg leading-relaxed uppercase tracking-widest text-[10px] italic">
              Cultivate and manage your professional identity. Your skills are the <span className="text-slate-900 not-italic font-black">active assets</span> of your network.
            </p>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
          >
            {isEditing ? "Cancel Edit" : "⚙️ Modify Assets"}
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Teaching Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform" />
            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:rotate-6 transition-transform border border-emerald-100 shadow-sm">🎓</div>
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight uppercase">I am Teaching</h2>
            <p className="text-slate-400 font-black text-[10px] mb-10 leading-relaxed uppercase tracking-widest opacity-60 italic">Skills you provide to the network</p>
            
            {isEditing ? (
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={offering} 
                  onChange={(e) => setOffering(e.target.value)}
                  className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-900 text-xl transition-all"
                  placeholder="e.g. React Development"
                />
              </div>
            ) : (
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 group-hover:bg-emerald-50/50 transition-colors">
                <p className="text-2xl font-black text-emerald-700 tracking-tight uppercase">{offering || "No skills listed yet"}</p>
              </div>
            )}
          </motion.div>

          {/* Learning Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform" />
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:-rotate-6 transition-transform border border-blue-100 shadow-sm">🧠</div>
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight uppercase">I am Learning</h2>
            <p className="text-slate-400 font-black text-[10px] mb-10 leading-relaxed uppercase tracking-widest opacity-60 italic">Skills you want to acquire</p>
            
            {isEditing ? (
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={needing} 
                  onChange={(e) => setNeeding(e.target.value)}
                  className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-900 text-xl transition-all"
                  placeholder="e.g. Machine Learning"
                />
              </div>
            ) : (
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                <p className="text-2xl font-black text-blue-700 tracking-tight uppercase">{needing || "No goals set yet"}</p>
              </div>
            )}
          </motion.div>
        </div>

        <AnimatePresence>
          {isEditing && (
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              className="mt-16 flex justify-center"
            >
              <button 
                onClick={handleUpdate}
                className="px-16 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-lg tracking-tighter shadow-2xl hover:bg-blue-600 transition-all hover:-translate-y-2 active:scale-95 shadow-blue-100"
              >
                Publish Variable Changes
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visibility Card */}
        <div className="mt-24 bg-white rounded-[3.5rem] p-16 text-slate-900 relative overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-12 group">
           <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full -ml-48 -mt-48 blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
           <div className="relative z-10 max-w-xl">
             <h3 className="text-4xl font-black mb-6 tracking-tighter leading-none uppercase">Professional Optimization 📈</h3>
             <p className="text-slate-400 font-bold mb-0 text-lg leading-relaxed uppercase tracking-widest text-[11px] italic">"Keep your skill matrix updated to increase your protocol match rate by <span className="text-blue-600 not-italic font-black text-2xl">3X</span> in the next 48 hours."</p>
           </div>
           <button className="px-10 py-5 bg-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 relative z-10">
             View Analytics
           </button>
        </div>
      </div>
    </div>
  );
};

export default Skill;
