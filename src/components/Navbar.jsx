import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  FiHome, 
  FiCompass, 
  FiBarChart2, 
  FiBookOpen, 
  FiUser, 
  FiLogIn, 
  FiUserPlus,
  FiChevronDown,
  FiSettings,
  FiLogOut,
  FiHelpCircle,
  FiBell,
  FiDollarSign,
  FiAward
} from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  // Load user data
  useEffect(() => {
    const loadUser = () => {
      const userData = JSON.parse(localStorage.getItem("Skillbar") || "null");
      setUser(userData);
    };

    loadUser();

    // Listen for storage changes
    window.addEventListener('storage', loadUser);
    return () => window.removeEventListener('storage', loadUser);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Explore", path: "/", icon: FiCompass },
    ...(user ? [
      { name: "Dashboard", path: "/dashboard", icon: FiBarChart2 },
      { name: "My Skills", path: "/skill", icon: FiBookOpen }
    ] : [])
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("Skillbar");
    setUser(null);
    setIsProfileOpen(false);
    navigate("/");
    
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slideIn';
    toast.textContent = 'Logged out successfully';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  // Mock notifications
  const notifications = [
    { id: 1, title: "New proposal received", time: "5 min ago", unread: true },
    { id: 2, title: "Skill match found", time: "1 hour ago", unread: true },
    { id: 3, title: "Profile viewed 10 times", time: "3 hours ago", unread: false },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 lg:px-12 pt-6">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`max-w-7xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl px-6 h-20 flex items-center justify-between border transition-all duration-300 ${
            scrolled ? 'shadow-lg border-slate-200/50' : 'shadow-md border-slate-100'
          }`}
        >
          {/* Logo Section */}
          <NavLink to="/" className="flex items-center gap-3 group relative">
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-xl blur-lg opacity-30"
              />
              <div className="relative w-11 h-11 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <span>S</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 leading-none tracking-tight">
                Skill<span className="text-blue-600">Bar</span>
              </span>
              <span className="text-[8px] font-medium text-slate-400 uppercase tracking-wider">
                Exchange Network
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path}
                to={link.path}
                onMouseEnter={() => setIsHovered(link.path)}
                onMouseLeave={() => setIsHovered(null)}
                className={({ isActive }) => `
                  relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? "text-blue-600" 
                    : "text-slate-600 hover:text-slate-900"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10 flex items-center gap-2">
                      <link.icon className="w-4 h-4" />
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div 
                        layoutId="active-nav"
                        className="absolute inset-0 bg-blue-50 rounded-xl -z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {isHovered === link.path && !isActive && (
                      <motion.div 
                        layoutId="hover-nav"
                        className="absolute inset-0 bg-slate-50 rounded-xl -z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {!user ? (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/login"
                  className="text-slate-600 hover:text-slate-900 font-medium text-sm px-4 py-2 transition-colors flex items-center gap-2"
                >
                  <FiLogIn className="w-4 h-4" />
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                >
                  <FiUserPlus className="w-4 h-4" />
                  Join Free
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* Credits Display */}
                <div className="hidden sm:block bg-gradient-to-r from-amber-50 to-amber-100/50 px-4 py-2 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4 text-amber-600" />
                    <span className="font-semibold text-amber-700">
                      {user.wallet?.total || 0} Credits
                    </span>
                  </div>
                </div>

                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative p-2.5 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <FiBell className="w-5 h-5 text-slate-600" />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isNotificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                      >
                        <div className="p-4 border-b border-slate-100">
                          <h3 className="font-semibold text-slate-900">Notifications</h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.map((notif) => (
                            <div
                              key={notif.id}
                              className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                                notif.unread ? 'bg-blue-50/30' : ''
                              }`}
                            >
                              <p className="text-sm font-medium text-slate-900 mb-1">
                                {notif.title}
                              </p>
                              <p className="text-xs text-slate-400">{notif.time}</p>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 border-t border-slate-100">
                          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View all
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile Menu */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 p-1.5 pr-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-lg">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email?.split('@')[0]}</p>
                    </div>
                    <FiChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                      >
                        {/* User Info */}
                        <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-xs opacity-90 mt-1">{user.email}</p>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <NavLink
                            to="/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
                          >
                            <FiUser className="w-4 h-4" />
                            <span>My Profile</span>
                          </NavLink>

                          <NavLink
                            to="/settings"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
                          >
                            <FiSettings className="w-4 h-4" />
                            <span>Settings</span>
                          </NavLink>

                          <div className="border-t border-slate-100 my-2" />

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <FiLogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-slate-50 border-t border-slate-100">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>Version 2.0.0</span>
                            <FiHelpCircle className="w-4 h-4" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </motion.nav>
      </div>

      {/* Mobile Bottom Navigation */}
      {user && (
        <div className="fixed bottom-0 left-0 w-full z-50 md:hidden">
          <div className="bg-white/90 backdrop-blur-xl border-t border-slate-200 px-4 py-2">
            <div className="flex items-center justify-around">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    flex flex-col items-center p-3 rounded-xl transition-colors
                    ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}
                  `}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium mt-1">{link.name}</span>
                </NavLink>
              ))}
              <NavLink
                to="/profile"
                className={({ isActive }) => `
                  flex flex-col items-center p-3 rounded-xl transition-colors
                  ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}
                `}
              >
                <FiUser className="w-5 h-5" />
                <span className="text-[10px] font-medium mt-1">Profile</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Add padding to main content to account for fixed navbar */}
      <style jsx>{`
        body {
          padding-top: 0;
        }
        main {
          padding-top: 0;
        }
      `}</style>
    </>
  );
};

export default Navbar;