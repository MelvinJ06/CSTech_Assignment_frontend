import { useState } from "react";
import API from "../api/api";

export default function UploadList() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const allowed = [".csv", ".xlsx", ".xls"];

  const handleFile = (e) => {
    setMessage("");
    const f = e.target.files[0];
    if (!f) return setFile(null);
    const ext = f.name.slice(((f.name.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
    if (!allowed.includes("." + ext)) {
      setMessage("❌ Invalid file type. Only .csv, .xlsx and .xls allowed.");
      setFile(null);
      return;
    }
    setFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!file) return setMessage("⚠️ Please select a valid file first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ " + (res.data.message || "Uploaded and distributed successfully!"));
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Upload failed. Try again!";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 opacity-70 blur-[60px]" />

      <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-white/60">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          📂 Upload & Distribute Lists
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Upload your <span className="font-medium text-indigo-600">CSV</span> or{" "}
          <span className="font-medium text-pink-600">Excel</span> file and automatically
          distribute it among 5 agents.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 rounded-xl py-8 bg-indigo-50/30 hover:bg-indigo-100/50 transition-all duration-300 cursor-pointer">
            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              onChange={handleFile}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-center text-gray-600 hover:text-indigo-700 transition"
            >
              {file ? (
                <span className="font-medium text-indigo-600">
                  📄 {file.name}
                </span>
              ) : (
                <>
                  <span className="text-5xl block mb-2">📁</span>
                  <span className="text-sm">
                    Click or drag a file here to upload
                  </span>
                </>
              )}
            </label>
          </div>

          {message && (
            <p
              className={`text-sm text-center font-medium ${
                message.includes("✅")
                  ? "text-green-600"
                  : message.includes("❌")
                  ? "text-red-500"
                  : "text-yellow-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-xl shadow-md transition-all duration-300 ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-pink-500 hover:shadow-lg hover:scale-[1.02]"
            }`}
          >
            {loading ? "⏳ Uploading..." : "🚀 Upload & Distribute"}
          </button>
        </form>
      </div>
    </div>
  );
}
