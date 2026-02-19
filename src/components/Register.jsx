import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Register = () => {
    const [user, setuser] = useState({
        name: "",
        email: "",
        password: "",
        skillName: "",
        needSkill: ""
    });

    const navigate = useNavigate();

    const inputvalue = (e) => {
        const { name, value } = e.target;
        setuser({ ...user, [name]: value });
    };

    const submitform = (e) => {
        e.preventDefault();
        localStorage.setItem("Skillbar", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Account Created SuccessFully!");
        navigate("/profile");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-blue-600 mb-2">Join SKILLBAR</h2>
                    <p className="text-gray-500 font-medium italic">"Knowledge increases by sharing but not by saving"</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={submitform}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                            <input
                                name="name"
                                type="text"
                                required
                                value={user.name}
                                onChange={inputvalue}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={user.email}
                                onChange={inputvalue}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                value={user.password}
                                onChange={inputvalue}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Your Skill</label>
                                <input
                                    name="skillName"
                                    type="text"
                                    required
                                    value={user.skillName}
                                    onChange={inputvalue}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. Design"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Skill Wanted</label>
                                <input
                                    name="needSkill"
                                    type="text"
                                    required
                                    value={user.needSkill}
                                    onChange={inputvalue}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. Coding"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Create Account
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="mx-4 text-xs font-bold text-gray-400 uppercase">Or</span>
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

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600 font-medium">
                        Already have an account?{" "}
                        <button onClick={() => navigate("/login")} className="text-blue-600 font-bold hover:underline">
                            Log in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;