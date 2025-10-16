import { useEffect, useState } from "react";
import API from "../api/api";

export default function AddAgent() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });
  const [status, setStatus] = useState({ success: "", error: "" });
  const [agents, setAgents] = useState([]);
  const [editingAgent, setEditingAgent] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await API.get("/agents");
      setAgents(res.data);
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: "", error: "" });

    try {
      if (editingAgent) {
        const res = await API.put(`/agents/${editingAgent._id}`, form);
        setStatus({ success: res.data.message, error: "" });
        setEditingAgent(null);
      } else {
        const res = await API.post("/agents", form);
        setStatus({ success: res.data.message, error: "" });
      }
      setForm({ name: "", email: "", mobile: "", password: "" });
      fetchAgents();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to save agent";
      setStatus({ success: "", error: msg });
    }
  };

  const handleEdit = (agent) => {
    setEditingAgent(agent);
    setForm({ name: agent.name, email: agent.email, mobile: agent.mobile, password: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;
    try {
      const res = await API.delete(`/agents/${id}`);
      setStatus({ success: res.data.message, error: "" });
      fetchAgents();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete agent";
      setStatus({ success: "", error: msg });
    }
  };

  const handleCancelEdit = () => {
    setEditingAgent(null);
    setForm({ name: "", email: "", mobile: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center py-10 px-4">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-4xl border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 tracking-wide">
          {editingAgent ? "✏️ Edit Agent Details" : "➕ Add New Agent"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4 mb-6 bg-white p-6 rounded-xl shadow-inner border border-gray-200"
        >
          <input
            name="name"
            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="mobile"
            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Mobile (+91...)"
            value={form.mobile}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder={editingAgent ? "New Password (optional)" : "Password"}
            value={form.password}
            onChange={handleChange}
            required={!editingAgent}
          />

          {status.success && (
            <p className="text-green-600 text-sm col-span-2">{status.success}</p>
          )}
          {status.error && (
            <p className="text-red-500 text-sm col-span-2">{status.error}</p>
          )}

          <div className="col-span-2 flex justify-center gap-4 mt-3">
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform"
            >
              {editingAgent ? "Update Agent" : "Add Agent"}
            </button>
            {editingAgent && (
              <button
                type="button"
                className="bg-gray-400 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-500 hover:scale-105 transition-transform"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 font-medium text-sm uppercase">
            Agent List
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {agents.length === 0 ? (
          <p className="text-center text-gray-500">No agents added yet.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800">
                <tr>
                  <th className="py-3 px-4 border-b">Name</th>
                  <th className="py-3 px-4 border-b">Email</th>
                  <th className="py-3 px-4 border-b">Mobile</th>
                  <th className="py-3 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, i) => (
                  <tr
                    key={agent._id}
                    className={`${
                      i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition-colors`}
                  >
                    <td className="py-3 px-4 border-b">{agent.name}</td>
                    <td className="py-3 px-4 border-b">{agent.email}</td>
                    <td className="py-3 px-4 border-b">{agent.mobile}</td>
                    <td className="py-3 px-4 border-b text-center">
                      <button
                        onClick={() => handleEdit(agent)}
                        className="bg-yellow-500 text-white px-3 py-1.5 rounded-lg hover:bg-yellow-600 shadow-sm transition-all mx-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(agent._id)}
                        className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 shadow-sm transition-all mx-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
