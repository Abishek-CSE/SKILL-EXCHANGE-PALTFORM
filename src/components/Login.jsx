import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const inputvalue = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const submitform = (e) => {
    e.preventDefault();
    const storedata = JSON.parse(localStorage.getItem("Skillbar"));

    if (!storedata) {
      toast.error("No user found. Please register first");
      return;
    }

    if (
      login.email === storedata.email &&
      login.password === storedata.password
    ) {
      toast.success("Login Successfully!");
      localStorage.setItem("isLoggedIn", "true");
      navigate("/profile");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">SKILLBAR</h1>
          <p className="text-gray-500 font-medium">Welcome back!</p>
        </div>

        <form onSubmit={submitform} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={login.email}
              onChange={inputvalue}
              placeholder="name@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={inputvalue}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-8">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-xs font-bold text-gray-400 uppercase">Or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-bold text-sm">
            <FcGoogle size={18} /> Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-bold text-sm">
            <FaGithub size={18} /> GitHub
          </button>
        </div>

        <p className="text-center mt-8 text-sm font-medium text-gray-600">
          New here? <button onClick={() => navigate("/register")} className="text-blue-600 font-bold hover:underline">Create an account</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
