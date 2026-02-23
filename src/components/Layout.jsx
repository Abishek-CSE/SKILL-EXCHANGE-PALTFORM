import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import { FiMail, FiPhone, FiMapPin, FiHeart, FiStar, FiTrendingUp } from "react-icons/fi";

const Layout = () => {
  const location = useLocation();
  
  // Don't show footer on login/register pages
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-50 flex flex-col">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-200/30 to-rose-200/30 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse-slow animation-delay-4000" />
      </div>

      {/* Toast Notifications with Custom Styling */}
      <Toaster 
        position="top-center"
        containerClassName="mt-20"
        toastOptions={{
          duration: 4000,
          success: {
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              fontWeight: '600',
              borderRadius: '1rem',
              boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.3), 0 8px 10px -6px rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '16px 24px',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#10b981',
            },
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#ffffff',
              fontWeight: '600',
              borderRadius: '1rem',
              boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.3), 0 8px 10px -6px rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '16px 24px',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#ef4444',
            },
          },
          loading: {
            style: {
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#ffffff',
              fontWeight: '600',
              borderRadius: '1rem',
              boxShadow: '0 20px 25px -5px rgba(99, 102, 241, 0.3), 0 8px 10px -6px rgba(99, 102, 241, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '16px 24px',
            },
          },
          custom: {
            style: {
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#ffffff',
              fontWeight: '600',
              borderRadius: '1rem',
              boxShadow: '0 20px 25px -5px rgba(245, 158, 11, 0.3), 0 8px 10px -6px rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '16px 24px',
            },
          },
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Main Content with Animation */}
      <motion.main 
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="flex-grow relative z-10"
      >
        <Outlet />
      </motion.main>

      {/* Footer - Only show on non-auth pages */}
      {!isAuthPage && (
        <footer className="relative z-10 bg-white/80 backdrop-blur-lg border-t border-slate-200/60 mt-auto">
          {/* Newsletter Section */}
          <div className="border-b border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Stay in the loop
                  </h3>
                  <p className="text-slate-500">
                    Join our newsletter to get updates on new features and skill matching opportunities.
                  </p>
                </div>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-600/20">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    S
                  </div>
                  <span className="text-xl font-bold text-slate-900">
                    Skill<span className="text-indigo-600">Bar</span>
                  </span>
                </div>
                <p className="text-slate-500 text-sm mb-4">
                  The world's first decentralized skill exchange platform where developers trade expertise.
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: FiHeart, color: "text-rose-500" },
                    { icon: FiStar, color: "text-amber-500" },
                    { icon: FiTrendingUp, color: "text-emerald-500" }
                  ].map((Icon, idx) => (
                    <div key={idx} className={`w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center ${Icon.color} hover:scale-110 transition-transform cursor-pointer`}>
                      <Icon.icon className="w-5 h-5" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {["About Us", "How it Works", "Success Stories", "Pricing", "FAQ"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Resources</h4>
                <ul className="space-y-2">
                  {["Blog", "Community", "Support", "Documentation", "API"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Contact Us</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                      <FiMail className="w-4 h-4" />
                    </div>
                    <span>support@skillbar.com</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                      <FiPhone className="w-4 h-4" />
                    </div>
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center text-pink-600">
                      <FiMapPin className="w-4 h-4" />
                    </div>
                    <span>San Francisco, CA</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-slate-200/60">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-400 text-sm">
                  © 2026 SkillBar Project. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                  <a href="#" className="text-xs text-slate-400 hover:text-indigo-600 transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-xs text-slate-400 hover:text-indigo-600 transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="text-xs text-slate-400 hover:text-indigo-600 transition-colors">
                    Cookie Policy
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Made with</span>
                  <FiHeart className="w-3 h-3 text-rose-500" />
                  <span className="text-xs text-slate-400">by SkillBar Team</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;