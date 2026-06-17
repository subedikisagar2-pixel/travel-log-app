import { useEffect, useState } from "react";
import api from "../services/api";
import LogCard from "../components/LogCard";

export default function Trending() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/logs", { params: { limit: 6, page: 1 } })
      .then((r) => setLogs(r.data.logs))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Header */}
      <div
        style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
        className="rounded-3xl px-10 py-12 text-white text-center mb-10 shadow-xl"
      >
        <div className="text-5xl mb-3">🔥</div>
        <h1 className="text-3xl font-bold mb-2">Trending Logs</h1>
        <p className="text-purple-200">Most popular travel stories right now</p>
      </div>

      {/* Top Tags Trending */}
      <div className="bg-white rounded-2xl p-6 border shadow-sm mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          🏷️ Trending Tags
        </h2>
        <div className="flex flex-wrap gap-3">
          {["adventure", "nature", "solo", "budget", "luxury", "family"].map(
            (tag, i) => (
              <div
                key={tag}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition cursor-pointer"
              >
                <span className="text-purple-600 font-bold text-sm">
                  #{i + 1}
                </span>
                <span className="text-gray-700 text-sm font-medium">
                  #{tag}
                </span>
                <span className="text-xs text-gray-400">🔥</span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Trending Logs */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        🌟 Top Travel Stories
      </h2>
      {loading ? (
        <div className="text-center py-20">
          <div className="text-5xl animate-bounce">🔥</div>
          <p className="text-gray-500 mt-4">Loading trending logs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logs.map((log, i) => (
            <div key={log._id} className="relative">
              {i < 3 && (
                <div
                  className="absolute -top-3 -left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                  style={{
                    background:
                      i === 0 ? "#f59e0b" : i === 1 ? "#9ca3af" : "#cd7c2f",
                  }}
                >
                  {i + 1}
                </div>
              )}
              <LogCard log={log} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
