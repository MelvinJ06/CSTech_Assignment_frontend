import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      setMsg("✅ " + res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message || "Registration failed"));
    }
  };

  const goToLogin = () => navigate("/login");

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-emerald-500 overflow-hidden">
      <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-16 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl bottom-10 right-10"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-white/30"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
          Create an Account ✨
        </h2>

        <p className="text-center text-white/80 mb-6 text-sm">
          Join us and start managing smarter
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="block w-full mb-4 p-3 rounded-lg bg-white/70 focus:bg-white border border-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none placeholder-gray-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
          className="block w-full mb-4 p-3 rounded-lg bg-white/70 focus:bg-white border border-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none placeholder-gray-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="block w-full mb-5 p-3 rounded-lg bg-white/70 focus:bg-white border border-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none placeholder-gray-500"
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-200"
        >
          Register
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
          Already have an account?{" "}
          <button
            type="button"
            onClick={goToLogin}
            className="text-yellow-300 hover:underline font-medium"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}
