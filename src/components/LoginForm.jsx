import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const { setToken } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      setToken(res.data.token); 
      setMsg("✅ Login successful!");
      navigate("/dashboard"); 
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Login failed");
    }
  };

  const goToRegister = () => navigate("/register");

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 overflow-hidden">
      <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-400/20 rounded-full blur-3xl bottom-10 right-10"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-white/30"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
          Welcome Back 👋
        </h2>

        <p className="text-center text-white/80 mb-6 text-sm">
          Sign in to access your dashboard
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="block w-full mb-4 p-3 rounded-lg bg-white/70 focus:bg-white border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="block w-full mb-5 p-3 rounded-lg bg-white/70 focus:bg-white border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500"
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-200"
        >
          Login
        </button>

        {msg && (
          <p
            className={`text-center mt-4 text-sm ${
              msg.includes("✅") ? "text-green-200" : "text-red-200"
            }`}
          >
            {msg}
          </p>
        )}

        <p className="text-center mt-6 text-sm text-white/80">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={goToRegister}
            className="text-yellow-300 hover:underline font-medium"
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
}
