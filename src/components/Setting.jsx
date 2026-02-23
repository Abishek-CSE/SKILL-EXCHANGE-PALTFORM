import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiBell, 
  FiEye, 
  FiEyeOff,
  FiGlobe,
  FiMoon,
  FiSun,
  FiShield,
  FiKey,
  FiSmartphone,
  FiCreditCard,
  FiLogOut,
  FiSave,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiTrash2,
  FiRefreshCw,
  FiUsers,
  FiAward,
  FiDollarSign,
  FiClock,
  FiCalendar,
  FiMapPin,
  FiBriefcase
} from "react-icons/fi";

const Setting = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("Skillbar") || "{}"));
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    fullName: user.name || "",
    email: user.email || "",
    username: user.email?.split('@')[0] || "",
    bio: "",
    location: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    website: "",
    github: "",
    linkedin: ""
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    sessionTimeout: "30",
    loginAlerts: true
  });

  const [notificationForm, setNotificationForm] = useState({
    emailNotifications: true,
    proposalAlerts: true,
    messageAlerts: true,
    marketingEmails: false,
    skillMatchAlerts: true,
    weeklyDigest: true,
    pushNotifications: true,
    soundEnabled: false
  });

  const [preferencesForm, setPreferencesForm] = useState({
    theme: "light",
    language: "en",
    timeFormat: "12h",
    dateFormat: "MM/DD/YYYY",
    compactView: false,
    showOnlineStatus: true,
    autoSave: true,
    defaultPrivacy: "public"
  });

  const [privacyForm, setPrivacyForm] = useState({
    profileVisibility: "public",
    showEmail: false,
    showLocation: true,
    showActivity: true,
    showCredits: true,
    allowMessages: "everyone",
    allowProposals: "everyone",
    showOnlineStatus: true
  });

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedPrefs = localStorage.getItem("skillbar_preferences");
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      setPreferencesForm(prev => ({ ...prev, ...prefs }));
    }

    const savedPrivacy = localStorage.getItem("skillbar_privacy");
    if (savedPrivacy) {
      setPrivacyForm(JSON.parse(savedPrivacy));
    }
  }, []);

  const handleProfileChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSecurityChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setSecurityForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  }, []);

  const handleNotificationChange = useCallback((e) => {
    const { name, checked } = e.target;
    setNotificationForm(prev => ({ ...prev, [name]: checked }));
  }, []);

  const handlePreferencesChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setPreferencesForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  }, []);

  const handlePrivacyChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setPrivacyForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  }, []);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const updatedUser = { 
      ...user, 
      name: profileForm.fullName,
      email: profileForm.email 
    };
    
    localStorage.setItem("Skillbar", JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    toast.success("Profile updated successfully!", {
      icon: "✅",
      duration: 3000
    });
    
    setIsLoading(false);
  };

  const handleSaveSecurity = async () => {
    // Validate passwords
    if (securityForm.newPassword && securityForm.newPassword !== securityForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (securityForm.newPassword && securityForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Security settings updated!", {
      icon: "🔒",
      duration: 3000
    });
    
    // Clear password fields
    setSecurityForm(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
    
    setIsLoading(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("skillbar_preferences", JSON.stringify(preferencesForm));
    toast.success("Preferences saved!", { icon: "⚙️" });
    
    // Apply theme
    if (preferencesForm.theme === "dark") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSavePrivacy = () => {
    localStorage.setItem("skillbar_privacy", JSON.stringify(privacyForm));
    toast.success("Privacy settings updated!", { icon: "🔒" });
  };

  const handleDeleteAccount = () => {
    // Simulate account deletion
    toast.error(
      <div>
        <p className="font-semibold">Account deletion requested</p>
        <p className="text-xs opacity-90">You'll receive a confirmation email</p>
      </div>,
      { duration: 5000 }
    );
    setShowDeleteConfirm(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: FiUser },
    { id: "security", label: "Security", icon: FiLock },
    { id: "notifications", label: "Notifications", icon: FiBell },
    { id: "preferences", label: "Preferences", icon: FiGlobe },
    { id: "privacy", label: "Privacy", icon: FiShield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-24 pb-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-500">Manage your account settings and preferences</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-80"
          >
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
                <h2 className="text-white font-semibold mb-1">Account Settings</h2>
                <p className="text-white/80 text-sm">Customize your experience</p>
              </div>
              
              <div className="p-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <tab.icon className={`w-5 h-5 ${
                      activeTab === tab.id ? "text-blue-600" : "text-slate-400"
                    }`} />
                    <span className="font-medium">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Danger Zone */}
              <div className="p-4 border-t border-slate-100">
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <FiTrash2 className="w-5 h-5" />
                  <span className="font-medium">Delete Account</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <AnimatePresence mode="wait">
                
                {/* Profile Settings */}
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Profile Information</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={profileForm.fullName}
                          onChange={handleProfileChange}
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
                          value={profileForm.username}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          placeholder="@username"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={profileForm.location}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          placeholder="City, Country"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={profileForm.bio}
                          onChange={handleProfileChange}
                          rows="4"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Website
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={profileForm.website}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          placeholder="https://example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          GitHub
                        </label>
                        <input
                          type="text"
                          name="github"
                          value={profileForm.github}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          placeholder="https://github.com/username"
                        />
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button
                        onClick={handleSaveProfile}
                        disabled={isLoading}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <FiRefreshCw className="w-4 h-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FiSave className="w-4 h-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Security Settings */}
                {activeTab === "security" && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Security Settings</h2>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900">Change Password</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={securityForm.currentPassword}
                          onChange={handleSecurityChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={securityForm.newPassword}
                          onChange={handleSecurityChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={securityForm.confirmPassword}
                          onChange={handleSecurityChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <h3 className="font-semibold text-slate-900">Two-Factor Authentication</h3>
                      
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <FiKey className="w-5 h-5 text-slate-400" />
                          <div>
                            <p className="font-medium text-slate-900">Enable 2FA</p>
                            <p className="text-sm text-slate-500">Add an extra layer of security</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="twoFactorEnabled"
                            checked={securityForm.twoFactorEnabled}
                            onChange={handleSecurityChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <h3 className="font-semibold text-slate-900">Session Settings</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Session Timeout (minutes)
                        </label>
                        <select
                          name="sessionTimeout"
                          value={securityForm.sessionTimeout}
                          onChange={handleSecurityChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <FiBell className="w-5 h-5 text-slate-400" />
                          <div>
                            <p className="font-medium text-slate-900">Login Alerts</p>
                            <p className="text-sm text-slate-500">Get notified on new logins</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="loginAlerts"
                            checked={securityForm.loginAlerts}
                            onChange={handleSecurityChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button
                        onClick={handleSaveSecurity}
                        disabled={isLoading}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <FiRefreshCw className="w-4 h-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <FiSave className="w-4 h-4" />
                            Update Security
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Notifications Settings */}
                {activeTab === "notifications" && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Notification Preferences</h2>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900">Email Notifications</h3>
                      
                      {[
                        { id: "emailNotifications", label: "Email Notifications", desc: "Receive emails about account activity" },
                        { id: "proposalAlerts", label: "Proposal Alerts", desc: "Get notified when you receive a proposal" },
                        { id: "messageAlerts", label: "Message Alerts", desc: "Get notified when you receive a message" },
                        { id: "skillMatchAlerts", label: "Skill Match Alerts", desc: "Get notified when skills match" },
                        { id: "weeklyDigest", label: "Weekly Digest", desc: "Receive weekly activity summary" },
                        { id: "marketingEmails", label: "Marketing Emails", desc: "Receive promotional offers and updates" }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                          <div>
                            <p className="font-medium text-slate-900">{item.label}</p>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name={item.id}
                              checked={notificationForm[item.id]}
                              onChange={handleNotificationChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 pt-4">
                      <h3 className="font-semibold text-slate-900">Push Notifications</h3>
                      
                      {[
                        { id: "pushNotifications", label: "Push Notifications", desc: "Receive browser notifications" },
                        { id: "soundEnabled", label: "Sound Alerts", desc: "Play sound for notifications" }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                          <div>
                            <p className="font-medium text-slate-900">{item.label}</p>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name={item.id}
                              checked={notificationForm[item.id]}
                              onChange={handleNotificationChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button
                        onClick={() => {
                          toast.success("Notification preferences saved!");
                        }}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <FiSave className="w-4 h-4" />
                        Save Preferences
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Preferences Settings */}
                {activeTab === "preferences" && (
                  <motion.div
                    key="preferences"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Preferences</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Theme
                        </label>
                        <div className="flex gap-3">
                          {["light", "dark", "system"].map((theme) => (
                            <button
                              key={theme}
                              onClick={() => setPreferencesForm(prev => ({ ...prev, theme }))}
                              className={`flex-1 px-4 py-3 rounded-xl border-2 capitalize ${
                                preferencesForm.theme === theme
                                  ? "border-blue-600 bg-blue-50 text-blue-600"
                                  : "border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              {theme === "light" && <FiSun className="w-5 h-5 mx-auto mb-1" />}
                              {theme === "dark" && <FiMoon className="w-5 h-5 mx-auto mb-1" />}
                              {theme === "system" && <FiGlobe className="w-5 h-5 mx-auto mb-1" />}
                              {theme}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Language
                        </label>
                        <select
                          name="language"
                          value={preferencesForm.language}
                          onChange={handlePreferencesChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        >
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="ja">日本語</option>
                          <option value="zh">中文</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Time Format
                        </label>
                        <select
                          name="timeFormat"
                          value={preferencesForm.timeFormat}
                          onChange={handlePreferencesChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        >
                          <option value="12h">12-hour (1:00 PM)</option>
                          <option value="24h">24-hour (13:00)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Date Format
                        </label>
                        <select
                          name="dateFormat"
                          value={preferencesForm.dateFormat}
                          onChange={handlePreferencesChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      {[
                        { id: "compactView", label: "Compact View", desc: "Show more content with less spacing" },
                        { id: "showOnlineStatus", label: "Show Online Status", desc: "Let others see when you're online" },
                        { id: "autoSave", label: "Auto Save", desc: "Automatically save changes as you type" }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                          <div>
                            <p className="font-medium text-slate-900">{item.label}</p>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name={item.id}
                              checked={preferencesForm[item.id]}
                              onChange={handlePreferencesChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button
                        onClick={handleSavePreferences}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <FiSave className="w-4 h-4" />
                        Save Preferences
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Privacy Settings */}
                {activeTab === "privacy" && (
                  <motion.div
                    key="privacy"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Privacy Settings</h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Profile Visibility
                        </label>
                        <select
                          name="profileVisibility"
                          value={privacyForm.profileVisibility}
                          onChange={handlePrivacyChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        >
                          <option value="public">Public - Everyone can see</option>
                          <option value="private">Private - Only connections</option>
                          <option value="hidden">Hidden - Only me</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Who can message you?
                        </label>
                        <select
                          name="allowMessages"
                          value={privacyForm.allowMessages}
                          onChange={handlePrivacyChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        >
                          <option value="everyone">Everyone</option>
                          <option value="connections">Only connections</option>
                          <option value="nobody">Nobody</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Who can send proposals?
                        </label>
                        <select
                          name="allowProposals"
                          value={privacyForm.allowProposals}
                          onChange={handlePrivacyChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        >
                          <option value="everyone">Everyone</option>
                          <option value="connections">Only connections</option>
                          <option value="nobody">Nobody</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <h3 className="font-semibold text-slate-900">Visibility Options</h3>
                      
                      {[
                        { id: "showEmail", label: "Show Email", desc: "Display email on your profile" },
                        { id: "showLocation", label: "Show Location", desc: "Display location on your profile" },
                        { id: "showActivity", label: "Show Activity", desc: "Display recent activity" },
                        { id: "showCredits", label: "Show Credits", desc: "Display credit balance" }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                          <div>
                            <p className="font-medium text-slate-900">{item.label}</p>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name={item.id}
                              checked={privacyForm[item.id]}
                              onChange={handlePrivacyChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button
                        onClick={handleSavePrivacy}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <FiSave className="w-4 h-4" />
                        Save Privacy Settings
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAlertCircle className="w-8 h-8 text-red-600" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
                Delete Account
              </h3>
              
              <p className="text-slate-500 text-center mb-6">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Setting;