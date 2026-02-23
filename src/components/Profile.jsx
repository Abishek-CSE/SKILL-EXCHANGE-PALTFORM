import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { 
  FiUser, 
  FiMail, 
  FiMapPin, 
  FiClock, 
  FiGithub, 
  FiLink, 
  FiAward,
  FiDollarSign,
  FiLock,
  FiTrendingUp,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiCamera,
  FiLogOut,
  FiSave,
  FiStar,
  FiBriefcase,
  FiCode,
  FiGlobe,
  FiShield,
  FiUpload
} from "react-icons/fi";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("skillbar_profile_image") || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("identity");
  const [userData, setUserData] = useState(null);
  const [profile, setProfile] = useState(null);

  // Load user data on mount
  useEffect(() => {
    const loadUserData = () => {
      const savedUser = localStorage.getItem("Skillbar");
      const savedProfile = localStorage.getItem("skillbar_profile");
      const user = savedUser ? JSON.parse(savedUser) : null;
      
      setUserData(user);

      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else if (user) {
        // Initialize profile with user data
        setProfile({
          ...user,
          fullName: user.name || "",
          username: user.email?.split("@")[0] || "",
          email: user.email || "",
          role: user.role || "Skill Specialist",
          bio: "",
          location: "",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          skills: {
            teach: {
              name: user.skillName || "",
              level: "Intermediate",
              experience: "1-3 years",
              certifications: []
            },
            learn: {
              name: user.needSkill || "",
              priority: "High",
              preferredLevel: "Expert"
            }
          },
          availability: {
            hoursPerWeek: 10,
            days: ["Mon", "Wed", "Fri"],
            sessionLength: 60,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          wallet: user.wallet || { total: 0, earned: 0, spent: 0, locked: 0 },
          reputation: user.reputation || {
            rating: 0,
            total: 0,
            completed: 0,
            completionRate: "0%",
            disputes: 0
          },
          links: {
            github: "",
            portfolio: "",
            linkedin: ""
          },
          verification: {
            identity: false,
            email: false,
            phone: false
          },
          stats: {
            memberSince: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            totalSessions: 0,
            totalHours: 0
          }
        });
      }
    };

    loadUserData();
  }, []);

  // Update profile when user data changes
  useEffect(() => {
    if (userData && profile) {
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

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested properties (e.g., "skills.teach.name")
    if (name.includes('.')) {
      const [parent, child, grandchild] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: grandchild ? {
            ...prev[parent]?.[child],
            [grandchild]: type === 'checkbox' ? checked : value
          } : type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  }, []);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image (JPEG, PNG, GIF, WEBP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      localStorage.setItem("skillbar_profile_image", reader.result);
      toast.success("Profile picture updated successfully", {
        icon: "📸",
        duration: 3000
      });
    };
    reader.onerror = () => {
      toast.error("Failed to upload image");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      localStorage.setItem("skillbar_profile", JSON.stringify(profile));
      toast.success("Profile saved successfully!", {
        icon: "✅",
        duration: 3000
      });
    } catch (error) {
      toast.error("Failed to save profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully", {
      icon: "👋",
      duration: 2000
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  }, []);

  // Calculate completion percentage
  const profileCompletion = useMemo(() => {
    if (!profile) return 0;
    
    const fields = [
      profile.fullName,
      profile.email,
      profile.bio,
      profile.location,
      profile.skills?.teach?.name,
      profile.skills?.learn?.name,
      profile.links?.github,
      profile.links?.portfolio
    ];
    
    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  }, [profile]);

  const sections = [
    { id: "identity", label: "Identity", icon: <FiUser className="w-5 h-5" />, color: "blue" },
    { id: "skills", label: "Skills", icon: <FiCode className="w-5 h-5" />, color: "purple" },
    { id: "availability", label: "Availability", icon: <FiClock className="w-5 h-5" />, color: "orange" },
    { id: "wallet", label: "Wallet", icon: <FiDollarSign className="w-5 h-5" />, color: "emerald" },
    { id: "verification", label: "Verification", icon: <FiShield className="w-5 h-5" />, color: "indigo" },
  ];

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-24 pb-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
        >
          {/* Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute -bottom-16 left-12 flex items-end gap-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-2xl bg-white p-1.5 shadow-2xl">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden flex items-center justify-center">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl font-bold text-slate-400">
                        {profile.fullName?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    )}
                  </div>
                </div>
                <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors border border-slate-200">
                  <FiCamera className="w-4 h-4 text-slate-600" />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-white mb-1">
                  {profile.fullName || "Complete Your Profile"}
                </h1>
                <p className="text-white/90 flex items-center gap-2">
                  <FiMail className="w-4 h-4" />
                  {profile.email || "Add your email"}
                </p>
              </div>
            </div>
            
            {/* Profile Completion */}
            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-white">
                  {profileCompletion}% Complete
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row pt-20">
            {/* Sidebar Navigation */}
            <div className="lg:w-80 bg-slate-50/50 border-r border-slate-100 p-6">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeSection === section.id
                        ? `bg-${section.color}-50 text-${section.color}-600 shadow-sm`
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span className={`${activeSection === section.id ? `text-${section.color}-600` : "text-slate-400"}`}>
                      {section.icon}
                    </span>
                    <span className="text-sm font-medium">{section.label}</span>
                    {activeSection === section.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className={`ml-auto w-1.5 h-1.5 rounded-full bg-${section.color}-500`}
                      />
                    )}
                  </button>
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Reputation</span>
                    <div className="flex items-center gap-1">
                      <FiStar className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{profile.reputation?.rating || 0}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Completed</span>
                    <span className="font-medium">{profile.reputation?.completed || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Success Rate</span>
                    <span className="font-medium text-emerald-600">{profile.reputation?.completionRate || "0%"}</span>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-8 w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 lg:p-12">
              <AnimatePresence mode="wait">
                <motion.form
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {/* Identity Section */}
                  {activeSection === "identity" && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Identity & Profile</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              value={profile.fullName || ""}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Username
                            </label>
                            <input
                              type="text"
                              name="username"
                              value={profile.username || ""}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                              placeholder="@username"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={profile.email || ""}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                              placeholder="john@example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Role
                            </label>
                            <select
                              name="role"
                              value={profile.role || ""}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            >
                              <option>Skill Specialist</option>
                              <option>Mentor</option>
                              <option>Expert</option>
                              <option>Consultant</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Bio
                            </label>
                            <textarea
                              name="bio"
                              value={profile.bio || ""}
                              onChange={handleChange}
                              rows="4"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                              placeholder="Tell us about yourself, your expertise, and what you're looking to learn..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Location
                            </label>
                            <div className="relative">
                              <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                              <input
                                type="text"
                                name="location"
                                value={profile.location || ""}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="City, Country"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Timezone
                            </label>
                            <div className="relative">
                              <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                              <input
                                type="text"
                                name="timezone"
                                value={profile.timezone || ""}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="America/New_York"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Skills Section */}
                  {activeSection === "skills" && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">Skills & Expertise</h2>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Teaching Skills */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-600 rounded-xl text-white">
                              <FiBriefcase className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">What I Teach</h3>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Skill Name
                              </label>
                              <input
                                type="text"
                                name="skills.teach.name"
                                value={profile.skills?.teach?.name || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="e.g., React Development"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Proficiency Level
                              </label>
                              <select
                                name="skills.teach.level"
                                value={profile.skills?.teach?.level || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                              >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                                <option>Expert</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Years of Experience
                              </label>
                              <select
                                name="skills.teach.experience"
                                value={profile.skills?.teach?.experience || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                              >
                                <option>&lt; 1 year</option>
                                <option>1-3 years</option>
                                <option>3-5 years</option>
                                <option>5+ years</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Learning Goals */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-purple-600 rounded-xl text-white">
                              <FiTrendingUp className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">What I Want to Learn</h3>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Skill Name
                              </label>
                              <input
                                type="text"
                                name="skills.learn.name"
                                value={profile.skills?.learn?.name || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                                placeholder="e.g., UI/UX Design"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Priority
                              </label>
                              <select
                                name="skills.learn.priority"
                                value={profile.skills?.learn?.priority || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                              >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Urgent</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Preferred Mentor Level
                              </label>
                              <select
                                name="skills.learn.preferredLevel"
                                value={profile.skills?.learn?.preferredLevel || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                              >
                                <option>Intermediate</option>
                                <option>Advanced</option>
                                <option>Expert</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Availability Section */}
                  {activeSection === "availability" && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">Availability & Schedule</h2>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Hours per Week
                          </label>
                          <input
                            type="range"
                            name="availability.hoursPerWeek"
                            min="0"
                            max="40"
                            step="5"
                            value={profile.availability?.hoursPerWeek || 10}
                            onChange={handleChange}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <div className="flex justify-between mt-2 text-sm text-slate-600">
                            <span>0h</span>
                            <span className="font-semibold text-blue-600">
                              {profile.availability?.hoursPerWeek || 10} hours/week
                            </span>
                            <span>40h</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Session Length
                          </label>
                          <select
                            name="availability.sessionLength"
                            value={profile.availability?.sessionLength || 60}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          >
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-4">
                          Available Days
                        </label>
                        <div className="grid grid-cols-7 gap-2">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                            <button
                              key={day}
                              type="button"
                              onClick={() => {
                                const currentDays = profile.availability?.days || [];
                                const newDays = currentDays.includes(day)
                                  ? currentDays.filter(d => d !== day)
                                  : [...currentDays, day];
                                setProfile(prev => ({
                                  ...prev,
                                  availability: {
                                    ...prev.availability,
                                    days: newDays
                                  }
                                }));
                              }}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                profile.availability?.days?.includes(day)
                                  ? "bg-blue-600 border-blue-600 text-white"
                                  : "bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300"
                              }`}
                            >
                              <span className="text-sm font-medium">{day}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Wallet Section */}
                  {activeSection === "wallet" && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">Wallet & Credits</h2>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: "Available", value: profile.wallet?.total || 0, color: "blue", icon: FiDollarSign },
                          { label: "Earned", value: profile.wallet?.earned || 0, color: "emerald", icon: FiTrendingUp },
                          { label: "Spent", value: profile.wallet?.spent || 0, color: "orange", icon: FiLock },
                          { label: "Escrow", value: profile.wallet?.locked || 0, color: "purple", icon: FiShield }
                        ].map((item, index) => (
                          <div
                            key={index}
                            className={`bg-${item.color}-50 p-6 rounded-2xl border border-${item.color}-100`}
                          >
                            <item.icon className={`w-5 h-5 text-${item.color}-600 mb-3`} />
                            <p className="text-sm text-slate-600 mb-1">{item.label}</p>
                            <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl text-white">
                        <div className="flex items-center gap-4 mb-6">
                          <FiShield className="w-8 h-8 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold mb-1">Secure Escrow System</h3>
                            <p className="text-sm text-slate-400">Your transactions are protected by our decentralized escrow system</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/10 p-4 rounded-xl">
                            <p className="text-xs text-slate-400 mb-1">Completion Rate</p>
                            <p className="text-xl font-bold">{profile.reputation?.completionRate || "0%"}</p>
                          </div>
                          <div className="bg-white/10 p-4 rounded-xl">
                            <p className="text-xs text-slate-400 mb-1">Total Sessions</p>
                            <p className="text-xl font-bold">{profile.reputation?.completed || 0}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Verification Section */}
                  {activeSection === "verification" && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">Verification & Links</h2>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Links */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-slate-900 mb-4">Professional Links</h3>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              GitHub
                            </label>
                            <div className="relative">
                              <FiGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                              <input
                                type="url"
                                name="links.github"
                                value={profile.links?.github || ""}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="https://github.com/username"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Portfolio
                            </label>
                            <div className="relative">
                              <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                              <input
                                type="url"
                                name="links.portfolio"
                                value={profile.links?.portfolio || ""}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="https://yourportfolio.com"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              LinkedIn
                            </label>
                            <div className="relative">
                              <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                              <input
                                type="url"
                                name="links.linkedin"
                                value={profile.links?.linkedin || ""}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="https://linkedin.com/in/username"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Verification Status */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-slate-900 mb-4">Verification Status</h3>
                          
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <div className="space-y-4">
                              {[
                                { label: "Email Verification", key: "email", icon: FiMail },
                                { label: "Phone Verification", key: "phone", icon: FiLock },
                                { label: "Identity Verification", key: "identity", icon: FiUser }
                              ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <item.icon className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm text-slate-600">{item.label}</span>
                                  </div>
                                  {profile.verification?.[item.key] ? (
                                    <span className="flex items-center gap-1 text-emerald-600">
                                      <FiCheckCircle className="w-4 h-4" />
                                      <span className="text-xs font-medium">Verified</span>
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1 text-slate-400">
                                      <FiXCircle className="w-4 h-4" />
                                      <span className="text-xs font-medium">Not Verified</span>
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Upload Document */}
                          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-colors group cursor-pointer">
                            <FiUpload className="w-8 h-8 text-slate-400 mx-auto mb-3 group-hover:text-blue-500 transition-colors" />
                            <p className="text-sm font-medium text-slate-700 mb-1">Upload Verification Document</p>
                            <p className="text-xs text-slate-400">PDF, JPG, PNG (Max 10MB)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6 border-t border-slate-100">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg shadow-blue-600/20"
                    >
                      {isSubmitting ? (
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
                </motion.form>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;