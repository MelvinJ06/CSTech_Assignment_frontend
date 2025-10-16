import { useState } from "react";
import AddAgent from "./AddAgent";
import UploadList from "./UploadList";
import ListDisplay from "./ListDisplay";

export default function Dashboard() {
  const [tab, setTab] = useState("agents");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col">
      <header className="flex justify-between items-center bg-white/60 backdrop-blur-md shadow-md px-8 py-4 border-b border-gray-200">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 tracking-tight">
          Admin Dashboard
        </h1>
      </header>

      <div className="flex justify-center mt-8 mb-4 space-x-4">
        {[
          { id: "agents", label: "👤 Add Agent" },
          { id: "upload", label: "📂 Upload CSV" },
          { id: "lists", label: "📋 View Lists" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`px-6 py-2.5 font-medium rounded-full shadow-sm transition-all duration-300 ${
              tab === item.id
                ? "bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-lg scale-105"
                : "bg-white/70 text-gray-700 hover:bg-white hover:shadow-md"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <main className="flex-grow px-6 md:px-10 py-6">
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8 border border-gray-100">
          {tab === "agents" && <AddAgent />}
          {tab === "upload" && <UploadList />}
          {tab === "lists" && <ListDisplay />}
        </div>
      </main>

      <footer className="text-center py-4 text-gray-500 text-sm mt-auto">
        © {new Date().getFullYear()} <span className="font-semibold text-indigo-600">LMS Admin</span> — All Rights Reserved.
      </footer>
    </div>
  );
}
