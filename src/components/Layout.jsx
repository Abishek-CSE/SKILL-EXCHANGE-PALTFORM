import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#0f172a',
            fontWeight: '600',
            borderRadius: '1rem',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            padding: '12px 24px',
          },
          success: {
            iconTheme: {
              primary: '#2563eb',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-100 py-12 text-center">
        <p className="text-gray-400 text-sm font-medium">
          © 2026 SkillBar Project. <span className="text-gray-300 mx-2">|</span> All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;