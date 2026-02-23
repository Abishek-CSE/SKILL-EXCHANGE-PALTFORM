import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { 
  FiActivity, 
  FiAward, 
  FiCheckCircle, 
  FiClock, 
  FiDollarSign, 
  FiLock, 
  FiSend, 
  FiDownload,
  FiFilter,
  FiSearch,
  FiRefreshCw,
  FiTrendingUp,
  FiUserCheck,
  FiXCircle
} from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedRating, setSelectedRating] = useState(5);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      const storedProposals = localStorage.getItem("skillbar_proposals");
      const storedUser = localStorage.getItem("Skillbar");
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      setProposals(storedProposals ? JSON.parse(storedProposals) : []);
      setCurrentUser(storedUser ? JSON.parse(storedUser) : {});

      if (!isLoggedIn) {
        navigate("/login");
      }
    };

    loadData();
  }, [navigate]);

  // Refresh data
  const refreshData = useCallback(() => {
    setIsRefreshing(true);
    const storedProposals = localStorage.getItem("skillbar_proposals");
    const storedUser = localStorage.getItem("Skillbar");
    
    setProposals(storedProposals ? JSON.parse(storedProposals) : []);
    setCurrentUser(storedUser ? JSON.parse(storedUser) : {});
    
    setTimeout(() => setIsRefreshing(false), 500);
    toast.success("Dashboard synced successfully");
  }, []);

  // Handle contract actions
  const handleContractAction = useCallback((id, action) => {
    const proposal = proposals.find(p => p.id === id);
    if (!proposal) return;

    const updatedProposals = proposals.map(p => {
      if (p.id === id) {
        switch(action) {
          case "Accept":
            return { ...p, status: "Active", acceptedAt: new Date().toISOString() };
          case "Reject":
            return { ...p, status: "Rejected", rejectedAt: new Date().toISOString() };
          case "Complete":
            return { 
              ...p, 
              status: "Completed", 
              rating: selectedRating,
              completedAt: new Date().toISOString() 
            };
          default:
            return p;
        }
      }
      return p;
    });

    // Update user wallet and reputation
    if (action === "Accept" && proposal.to === currentUser?.name) {
      const updatedUser = { 
        ...currentUser, 
        wallet: { 
          total: Math.max(0, (currentUser.wallet?.total || 10) - 1),
          locked: (currentUser.wallet?.locked || 0) + 1
        },
        stats: {
          ...currentUser.stats,
          acceptedProposals: (currentUser.stats?.acceptedProposals || 0) + 1
        }
      };
      setCurrentUser(updatedUser);
      localStorage.setItem("Skillbar", JSON.stringify(updatedUser));
      toast.success("Proposal accepted • 1 credit moved to escrow", {
        icon: "🔒",
        duration: 3000
      });
    }

    if (action === "Reject" && proposal.to === currentUser?.name) {
      const updatedUser = { 
        ...currentUser,
        stats: {
          ...currentUser.stats,
          rejectedProposals: (currentUser.stats?.rejectedProposals || 0) + 1
        }
      };
      setCurrentUser(updatedUser);
      localStorage.setItem("Skillbar", JSON.stringify(updatedUser));
      toast.error("Proposal declined", {
        icon: "✖️",
        duration: 2000
      });
    }

    if (action === "Complete") {
      const currentRating = currentUser.reputation?.rating || 0;
      const completedCount = currentUser.reputation?.completed || 0;
      const newRating = ((currentRating * completedCount) + selectedRating) / (completedCount + 1);

      const updatedUser = { 
        ...currentUser, 
        wallet: { 
          total: (currentUser.wallet?.total || 9) + 1,
          locked: Math.max(0, (currentUser.wallet?.locked || 1) - 1)
        },
        reputation: {
          rating: Number(newRating.toFixed(1)),
          completed: completedCount + 1,
          completionRate: "100%"
        },
        stats: {
          ...currentUser.stats,
          completedProposals: (currentUser.stats?.completedProposals || 0) + 1,
          totalEarned: (currentUser.stats?.totalEarned || 0) + 1
        }
      };
      setCurrentUser(updatedUser);
      localStorage.setItem("Skillbar", JSON.stringify(updatedUser));
      toast.success(`Proposal completed! +${selectedRating} reputation points`, {
        icon: "⭐",
        duration: 3000
      });
    }

    setProposals(updatedProposals);
    localStorage.setItem("skillbar_proposals", JSON.stringify(updatedProposals));
  }, [proposals, currentUser, selectedRating]);

  // Filter and search proposals
  const filteredProposals = useMemo(() => {
    const userProposals = proposals.filter(p => 
      p.to === currentUser?.name || p.from === currentUser?.name
    );

    return userProposals.filter(p => {
      const matchesStatus = filterStatus === "all" || p.status.toLowerCase() === filterStatus.toLowerCase();
      const matchesSearch = searchTerm === "" || 
        p.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.to?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.message?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  }, [proposals, currentUser, filterStatus, searchTerm]);

  // Calculate statistics
  const stats = useMemo(() => [
    { 
      label: "Available Credits", 
      value: currentUser?.wallet?.total || 0, 
      color: "blue", 
      icon: <FiDollarSign className="w-6 h-6" />,
      change: "+12%",
      trend: "up"
    },
    { 
      label: "Escrowed", 
      value: currentUser?.wallet?.locked || 0, 
      color: "orange", 
      icon: <FiLock className="w-6 h-6" />,
      change: "-3%",
      trend: "down"
    },
    { 
      label: "Reputation", 
      value: `${(currentUser?.reputation?.rating || 0).toFixed(1)}`, 
      suffix: "★",
      color: "purple", 
      icon: <FiAward className="w-6 h-6" />,
      change: "+0.2",
      trend: "up"
    }
  ], [currentUser]);

  // Proposal counts
  const proposalCounts = useMemo(() => ({
    pending: proposals.filter(p => p.status === "Pending" && p.to === currentUser?.name).length,
    active: proposals.filter(p => p.status === "Active").length,
    completed: proposals.filter(p => p.status === "Completed").length
  }), [proposals, currentUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-28 pb-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Dashboard
              </h1>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full border border-emerald-100">
                LIVE
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-500">
              <FiUserCheck className="w-4 h-4" />
              <span className="text-sm font-medium">{currentUser?.name || "Active Session"}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="text-sm">Member since {new Date().getFullYear()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={refreshData}
              className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </motion.button>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-slate-600">System Online</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${stat.color}-50 rounded-xl text-${stat.color}-600`}>
                  {stat.icon}
                </div>
                {stat.change && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-slate-900">
                {stat.value}{stat.suffix}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-xs font-medium text-blue-600 mb-1">Pending Actions</p>
            <p className="text-2xl font-bold text-blue-700">{proposalCounts.pending}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl">
            <p className="text-xs font-medium text-orange-600 mb-1">Active Projects</p>
            <p className="text-2xl font-bold text-orange-700">{proposalCounts.active}</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl">
            <p className="text-xs font-medium text-emerald-600 mb-1">Completed</p>
            <p className="text-2xl font-bold text-emerald-700">{proposalCounts.completed}</p>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search proposals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-3">
            <FiFilter className="text-slate-400 w-4 h-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </motion.div>

        {/* Proposals Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <FiActivity className="w-5 h-5 text-blue-600" />
                  Activity Feed
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Showing {filteredProposals.length} of {proposals.length} total proposals
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {filteredProposals.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiClock className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No proposals found</h3>
                <p className="text-sm text-slate-500">
                  {searchTerm || filterStatus !== "all" 
                    ? "Try adjusting your filters" 
                    : "Your activity feed will appear here"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredProposals.map((proposal) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      key={proposal.id}
                      className="bg-white border border-slate-100 p-6 rounded-xl hover:border-slate-200 transition-all hover:shadow-sm"
                    >
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`p-3 rounded-xl ${
                            proposal.status === "Active" ? "bg-blue-50 text-blue-600" :
                            proposal.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                            proposal.status === "Rejected" ? "bg-red-50 text-red-600" :
                            "bg-slate-50 text-slate-600"
                          }`}>
                            {proposal.from === currentUser?.name ? 
                              <FiSend className="w-5 h-5" /> : 
                              <FiDownload className="w-5 h-5" />
                            }
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-slate-900">
                                {proposal.from === currentUser?.name 
                                  ? `To: ${proposal.to}` 
                                  : `From: ${proposal.from}`}
                              </h4>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                proposal.status === "Pending" ? "bg-orange-50 text-orange-600" :
                                proposal.status === "Active" ? "bg-blue-50 text-blue-600" :
                                proposal.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                                "bg-red-50 text-red-600"
                              }`}>
                                {proposal.status}
                              </span>
                            </div>
                            
                            <p className="text-sm text-slate-600 mb-2">
                              Skill: <span className="font-medium">{proposal.message}</span>
                            </p>
                            
                            {proposal.acceptedAt && (
                              <p className="text-xs text-slate-400">
                                Accepted: {new Date(proposal.acceptedAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                          {proposal.status === "Pending" && proposal.to === currentUser?.name && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleContractAction(proposal.id, "Accept")}
                                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                              >
                                <FiCheckCircle className="w-4 h-4" />
                                Accept
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleContractAction(proposal.id, "Reject")}
                                className="px-5 py-2.5 bg-white text-red-600 border border-red-200 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2"
                              >
                                <FiXCircle className="w-4 h-4" />
                                Decline
                              </motion.button>
                            </>
                          )}

                          {proposal.status === "Active" && (
                            <div className="flex items-center gap-3">
                              <select
                                value={selectedRating}
                                onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              >
                                {[5,4,3,2,1].map(r => (
                                  <option key={r} value={r}>{r} Stars</option>
                                ))}
                              </select>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleContractAction(proposal.id, "Complete")}
                                className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
                              >
                                <FiCheckCircle className="w-4 h-4" />
                                Complete
                              </motion.button>
                            </div>
                          )}

                          {proposal.completedAt && (
                            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                              <FiAward className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium">{proposal.rating} ★</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>

        {/* Performance Summary */}
        {filteredProposals.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-white p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Success Rate</p>
              <p className="text-lg font-bold text-slate-900">
                {proposals.filter(p => p.status === "Completed").length > 0
                  ? Math.round((proposals.filter(p => p.status === "Completed").length / proposals.length) * 100)
                  : 0}%
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Avg Rating</p>
              <p className="text-lg font-bold text-slate-900">
                {proposals.filter(p => p.rating).length > 0
                  ? (proposals.reduce((acc, p) => acc + (p.rating || 0), 0) / proposals.filter(p => p.rating).length).toFixed(1)
                  : "N/A"} ★
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Active Projects</p>
              <p className="text-lg font-bold text-slate-900">{proposalCounts.active}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Total Earned</p>
              <p className="text-lg font-bold text-slate-900">{currentUser?.stats?.totalEarned || 0} credits</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;