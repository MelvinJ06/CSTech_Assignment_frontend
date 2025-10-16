import { useEffect, useState } from "react";
import API from "../api/api";

export default function ListDisplay() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const fetchLists = async () => {
    try {
      setLoading(true);
      const res = await API.get("/upload/lists");
      setGroups(res.data || []);
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to fetch lists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-blue-600 font-medium text-lg animate-pulse">
        Loading distributed lists...
      </div>
    );

  if (err)
    return <p className="text-red-500 text-center font-semibold">{err}</p>;

  if (!groups.length)
    return (
      <p className="text-center text-gray-500 italic mt-6">
        No lists distributed yet.
      </p>
    );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8 rounded-xl shadow-inner">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10 drop-shadow-md">
        Distributed Lists Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((g) => (
          <div
            key={g.agent?.id || Math.random()}
            className="bg-white bg-opacity-80 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-blue-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >

            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold text-xl text-blue-600">
                  {g.agent?.name || "Unknown Agent"}
                </h3>
                <p className="text-sm text-gray-500">{g.agent?.email}</p>
              </div>
              <div className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                {g.items?.length || 0} items
              </div>
            </div>

            <ul className="text-sm text-gray-700 max-h-48 overflow-auto pr-1 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
              {g.items?.map((it, i) => (
                <li
                  key={i}
                  className="border-b border-gray-100 py-2 hover:bg-blue-50 transition-all rounded-md"
                >
                  <div className="font-medium text-gray-800">{it.firstName}</div>
                  <div className="text-xs text-gray-600">{it.phone}</div>
                  {it.notes && (
                    <div className="text-xs text-gray-500 italic mt-1">
                      {it.notes}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="absolute top-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 left-10 w-52 h-52 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
    </div>
  );
}
