import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [proposals, setProposals] = useState(() => JSON.parse(localStorage.getItem("skillbar_proposals") || "[]"));
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem("Skillbar") || "{}"));
  const [selectedRating, setSelectedRating] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleContractAction = (id, action) => {
    const updatedProposals = proposals.map(p => {
      if (p.id === id) {
        if (action === "Accept") return { ...p, status: "Active", timestamp: new Date().toISOString() };
        if (action === "Reject") return { ...p, status: "Rejected" };
        if (action === "Complete") return { ...p, status: "Completed", rating: selectedRating };
      }
      return p;
    });

    if (action === "Accept") {
       const updatedUser = { 
         ...currentUser, 
         wallet: { 
           ...currentUser.wallet, 
           total: (currentUser.wallet?.total || 10) - 1,
           locked: (currentUser.wallet?.locked || 0) + 1
         } 
       };
       setCurrentUser(updatedUser);
       localStorage.setItem("Skillbar", JSON.stringify(updatedUser));
       toast.success("Proposal Accepted. Credits moved to Escrow.");
    }

    if (action === "Reject") {
        toast.error("Proposal Declined.");
    }

    if (action === "Complete") {
        const updatedUser = { 
            ...currentUser, 
            wallet: { 
              ...currentUser.wallet, 
              locked: (currentUser.wallet?.locked || 1) - 1,
              total: (currentUser.wallet?.total || 9) + 1
            },
            reputation: {
                ...currentUser.reputation,
                rating: ((currentUser.reputation?.rating || 0) * (currentUser.reputation?.completed || 0) + selectedRating) / ((currentUser.reputation?.completed || 0) + 1),
                completed: (currentUser.reputation?.completed || 0) + 1,
                completionRate: "100%"
            }
        };
        setCurrentUser(updatedUser);
        localStorage.setItem("Skillbar", JSON.stringify(updatedUser));
        toast.success(`Skill exchange finalized. + ${selectedRating} to your reputation.`);
    }

    setProposals(updatedProposals);
    localStorage.setItem("skillbar_proposals", JSON.stringify(updatedProposals));
  };

  const filteredProposals = proposals.filter(p => p.to === currentUser?.name || p.from === currentUser?.name);

  const stats = [
    { label: "Available Credits", value: currentUser?.wallet?.total || 0, color: "blue", icon: "💎" },
    { label: "Escrowed", value: currentUser?.wallet?.locked || 0, color: "orange", icon: "🔒" },
    { label: "Reputation", value: `${(currentUser?.reputation?.rating || 0).toFixed(1)} ★`, color: "purple", icon: "⭐" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-20 px-4 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6"
        >
          <div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4 leading-none uppercase">
              Control <span className="text-blue-600">Center</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs ml-1">Account: <span className="text-slate-900">{currentUser?.name || "Active Session"}</span></p>
          </div>
          <div className="bg-white border border-slate-100 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Sync Operational</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
              <div className="flex items-center justify-between mb-8 relative z-10">
                <span className="text-4xl">{stat.icon}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest text-${stat.color}-600 bg-${stat.color}-50 px-3 py-1 rounded-full border border-${stat.color}-100`}>Verified</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2 ml-1">{stat.label}</h3>
                <p className="text-5xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proposals Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden"
        >
          <div className="p-12 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
                PROTOCOL ACTIVITY <span className="bg-blue-600 text-white text-[9px] px-3 py-1 rounded-lg uppercase tracking-widest">Live</span>
              </h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2 ml-1">Active and Historical Proposal Streams</p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {filteredProposals.length === 0 ? (
              <div className="py-32 text-center bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100">
                <div className="text-6xl mb-8 opacity-20 grayscale">📂</div>
                <h3 className="text-2xl font-black text-slate-400 tracking-tight uppercase">No active protocols found</h3>
                <p className="text-slate-500 mt-2 font-bold uppercase tracking-widest text-[10px]">Your activity log is currently empty</p>
              </div>
            ) : (
              <div className="grid gap-6">
                <AnimatePresence>
                  {filteredProposals.map((proposal) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={proposal.id}
                      className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex flex-col lg:flex-row items-center justify-between gap-8 hover:bg-slate-50 transition-all hover:border-slate-200 shadow-md hover:shadow-lg"
                    >
                      <div className="flex items-center gap-8 w-full lg:w-auto">
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl shadow-xl border ${
                          proposal.status === "Active" ? "bg-blue-50 border-blue-100 text-blue-600" : 
                          proposal.status === "Completed" ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
                          proposal.status === "Rejected" ? "bg-red-50 border-red-100 text-red-600" :
                          "bg-slate-50 border-slate-100 text-slate-600"
                        }`}>
                          {proposal.from === currentUser?.name ? "📤" : "📥"}
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1 italic">{proposal.status === "Active" ? "Live Logic Channel" : "Protocol Header"}</p>
                          <h4 className="text-xl font-black text-slate-900 tracking-tight">
                            {proposal.from === currentUser?.name ? `Sent to ${proposal.to}` : `From ${proposal.from}`}
                          </h4>
                          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest text-[10px] bg-slate-100 px-3 py-1 rounded-full mt-2 inline-block">Skill: {proposal.message}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-center lg:justify-end">
                        <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                          proposal.status === "Pending" ? "bg-orange-50 text-orange-600 border-orange-100" :
                          proposal.status === "Active" ? "bg-blue-50 text-blue-600 border-blue-100" :
                          proposal.status === "Completed" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                          "bg-red-50 text-red-600 border-red-100"
                        }`}>
                          {proposal.status}
                        </div>

                        {proposal.status === "Pending" && proposal.to === currentUser?.name && (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleContractAction(proposal.id, "Accept")}
                              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95"
                            >
                              Connect
                            </button>
                            <button 
                              onClick={() => handleContractAction(proposal.id, "Reject")}
                              className="px-6 py-3 bg-white text-red-600 border border-red-100 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all active:scale-95"
                            >
                              Decline
                            </button>
                          </div>
                        )}

                        {proposal.status === "Active" && (
                          <div className="flex items-center gap-4">
                            <select 
                              onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                              className="bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-xl outline-none"
                            >
                              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ★</option>)}
                            </select>
                            <button 
                              onClick={() => handleContractAction(proposal.id, "Complete")}
                              className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl active:scale-95"
                            >
                              Finalize
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
