import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { 
  FiBookOpen, 
  FiTarget, 
  FiEdit2, 
  FiSave, 
  FiX, 
  FiTrendingUp,
  FiAward,
  FiBarChart2,
  FiClock,
  FiCheckCircle,
  FiPlus,
  FiTrash2,
  FiBriefcase,
  FiCpu
} from "react-icons/fi";

const Skill = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("Skillbar") || "{}"));
  const [offering, setOffering] = useState([]);
  const [needing, setNeeding] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newOffering, setNewOffering] = useState("");
  const [newNeeding, setNewNeeding] = useState("");
  const [activeTab, setActiveTab] = useState("teach");
  const [isLoading, setIsLoading] = useState(false);

  // Load skills from user data
  useEffect(() => {
    if (user) {
      // Parse comma-separated skills or use array
      const offeringSkills = user.skillName 
        ? (Array.isArray(user.skillName) ? user.skillName : user.skillName.split(',').map(s => s.trim()))
        : [];
      const needingSkills = user.needSkill 
        ? (Array.isArray(user.needSkill) ? user.needSkill : user.needSkill.split(',').map(s => s.trim()))
        : [];
      
      setOffering(offeringSkills);
      setNeeding(needingSkills);
    }
  }, [user]);

  const handleAddOffering = useCallback(() => {
    if (!newOffering.trim()) {
      toast.error("Please enter a skill");
      return;
    }
    if (offering.includes(newOffering.trim())) {
      toast.error("Skill already exists");
      return;
    }
    setOffering(prev => [...prev, newOffering.trim()]);
    setNewOffering("");
    toast.success("Skill added", { icon: "➕" });
  }, [newOffering, offering]);

  const handleAddNeeding = useCallback(() => {
    if (!newNeeding.trim()) {
      toast.error("Please enter a skill");
      return;
    }
    if (needing.includes(newNeeding.trim())) {
      toast.error("Skill already exists");
      return;
    }
    setNeeding(prev => [...prev, newNeeding.trim()]);
    setNewNeeding("");
    toast.success("Goal added", { icon: "🎯" });
  }, [newNeeding, needing]);

  const handleRemoveOffering = useCallback((skillToRemove) => {
    setOffering(prev => prev.filter(skill => skill !== skillToRemove));
    toast.success("Skill removed", { icon: "🗑️" });
  }, []);

  const handleRemoveNeeding = useCallback((skillToRemove) => {
    setNeeding(prev => prev.filter(skill => skill !== skillToRemove));
    toast.success("Goal removed", { icon: "🗑️" });
  }, []);

  const handleUpdate = useCallback(async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { 
      ...user, 
      skillName: offering.join(', '), 
      needSkill: needing.join(', ')
    };
    
    localStorage.setItem("Skillbar", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    setIsLoading(false);
    
    toast.success(
      <div>
        <p className="font-semibold">Skills updated successfully!</p>
        <p className="text-xs opacity-90">Your profile is now more discoverable</p>
      </div>,
      { icon: "✅", duration: 3000 }
    );
  }, [user, offering, needing]);

  const handleCancel = useCallback(() => {
    // Reset to original values
    const offeringSkills = user.skillName 
      ? (Array.isArray(user.skillName) ? user.skillName : user.skillName.split(',').map(s => s.trim()))
      : [];
    const needingSkills = user.needSkill 
      ? (Array.isArray(user.needSkill) ? user.needSkill : user.needSkill.split(',').map(s => s.trim()))
      : [];
    
    setOffering(offeringSkills);
    setNeeding(needingSkills);
    setNewOffering("");
    setNewNeeding("");
    setIsEditing(false);
    toast("Edit cancelled", { icon: "↩️" });
  }, [user]);

  // Calculate match potential
  const matchPotential = offering.length + needing.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-24 pb-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
                Skill Portfolio
              </h1>
              <p className="text-slate-500 max-w-2xl">
                Manage your teaching expertise and learning goals. Keep your skills updated to increase matching opportunities.
              </p>
            </div>
            
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                isEditing 
                  ? "bg-red-50 text-red-600 hover:bg-red-100" 
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20"
              }`}
            >
              {isEditing ? (
                <>
                  <FiX className="w-5 h-5" />
                  Cancel Edit
                </>
              ) : (
                <>
                  <FiEdit2 className="w-5 h-5" />
                  Edit Skills
                </>
              )}
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FiBookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-slate-500">Teaching</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{offering.length}</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <FiTarget className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-slate-500">Learning</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{needing.length}</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <FiTrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm text-slate-500">Match Potential</span>
              </div>
              <p className="text-2xl font-bold text-emerald-600">{matchPotential * 3}x</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <FiAward className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm text-slate-500">Profile Strength</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {Math.min(100, (offering.length + needing.length) * 20)}%
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Teaching Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <FiBookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Teaching Expertise</h2>
                  <p className="text-blue-100 text-sm">Skills you're offering to the community</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {isEditing ? (
                <div className="space-y-4">
                  {/* Add new skill input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newOffering}
                      onChange={(e) => setNewOffering(e.target.value)}
                      placeholder="Add a skill (e.g., React, Python)"
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddOffering()}
                    />
                    <button
                      onClick={handleAddOffering}
                      className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <FiPlus className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Skills list */}
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {offering.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="group flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        <span className="font-medium text-slate-700">{skill}</span>
                        <button
                          onClick={() => handleRemoveOffering(skill)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                    
                    {offering.length === 0 && (
                      <p className="text-center py-8 text-slate-400">
                        No skills added yet. Add your first skill above.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {offering.map((skill, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-blue-50 to-blue-50/30 rounded-xl border border-blue-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg">
                          <FiBriefcase className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-slate-800">{skill}</span>
                      </div>
                    </div>
                  ))}
                  
                  {offering.length === 0 && (
                    <div className="text-center py-16 bg-slate-50 rounded-xl">
                      <FiBookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-400 font-medium">No teaching skills listed</p>
                      <p className="text-sm text-slate-400 mt-1">Click "Edit Skills" to add your expertise</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Learning Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <FiTarget className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Learning Goals</h2>
                  <p className="text-purple-100 text-sm">Skills you want to acquire</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {isEditing ? (
                <div className="space-y-4">
                  {/* Add new goal input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNeeding}
                      onChange={(e) => setNewNeeding(e.target.value)}
                      placeholder="Add a goal (e.g., Machine Learning)"
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddNeeding()}
                    />
                    <button
                      onClick={handleAddNeeding}
                      className="px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                    >
                      <FiPlus className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Goals list */}
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {needing.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="group flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        <span className="font-medium text-slate-700">{skill}</span>
                        <button
                          onClick={() => handleRemoveNeeding(skill)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                    
                    {needing.length === 0 && (
                      <p className="text-center py-8 text-slate-400">
                        No goals added yet. Add your first learning goal above.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {needing.map((skill, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-purple-50 to-purple-50/30 rounded-xl border border-purple-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-600 rounded-lg">
                          <FiCpu className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-slate-800">{skill}</span>
                      </div>
                    </div>
                  ))}
                  
                  {needing.length === 0 && (
                    <div className="text-center py-16 bg-slate-50 rounded-xl">
                      <FiTarget className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-400 font-medium">No learning goals set</p>
                      <p className="text-sm text-slate-400 mt-1">Click "Edit Skills" to add your goals</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Action Buttons when Editing */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 flex items-center gap-4">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-blue-600/20"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <FiBarChart2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Skill Match Insights</h3>
                <p className="text-slate-300 max-w-2xl">
                  Your skills are being analyzed against 2,847 active users. 
                  Update your portfolio to increase visibility and match potential.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400">{matchPotential}</p>
                <p className="text-xs text-slate-400">Current Skills</p>
              </div>
              <FiTrendingUp className="w-6 h-6 text-emerald-400" />
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-400">{matchPotential * 3}</p>
                <p className="text-xs text-slate-400">Potential Matches</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        {offering.length > 0 && needing.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white rounded-2xl border border-slate-100 p-6"
          >
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FiCheckCircle className="w-5 h-5 text-emerald-500" />
              Skill Match Recommendations
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {offering.slice(0, 3).map((skill, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <FiBookOpen className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-slate-700">{skill}</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-600 rounded-lg">
                    {Math.floor(Math.random() * 10) + 5} matches
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Skill;