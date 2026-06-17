import { useState } from "react";
import api from "../services/api";
import LogCard from "../components/LogCard";

const TAGS = ["adventure", "budget", "family", "luxury", "solo", "nature"];

export default function Search() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const { data } = await api.get("/logs", {
        params: { q: query, tag, limit: 20 },
      });
      setLogs(data.logs);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 px-8 py-14 shadow-2xl shadow-slate-950/30 mb-10">
        <div className="absolute -left-32 top-8 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -right-24 top-36 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-emerald-300 mb-5">
            Search travel stories
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
            Discover your next adventure
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300 mb-10">
            Search by destination, title, or tag to explore the best travel logs
            from around the world.
          </p>

          <form
            onSubmit={handleSearch}
            className="grid gap-4 sm:grid-cols-[1fr_auto]"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destination, title, or experience..."
              className="w-full rounded-[1.5rem] border border-white/10 bg-slate-900/90 px-6 py-4 text-white shadow-xl shadow-slate-950/20 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-[1.5rem] bg-gradient-to-r from-emerald-400 to-cyan-400 px-8 py-4 font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-6 shadow-2xl shadow-slate-950/20 mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Filter by tags</h2>
            <p className="text-sm text-slate-400">
              Tap a tag to refine your search results.
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            {tag ? `Active: #${tag}` : "Showing all tags"}
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setTag("")}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${tag === "" ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/20" : "bg-slate-900 text-slate-300 border border-white/10 hover:bg-slate-800"}`}
          >
            All
          </button>
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${tag === t ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/20" : "bg-slate-900 text-slate-300 border border-white/10 hover:bg-slate-800"}`}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-14 text-center shadow-2xl shadow-slate-950/20">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-5xl text-emerald-400 shadow-inner">
            🔍
          </div>
          <p className="mt-6 text-lg text-slate-300">
            Searching for the best travel logs...
          </p>
        </div>
      ) : searched && logs.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-14 text-center shadow-2xl shadow-slate-950/20">
          <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-5xl text-emerald-300 shadow-inner">
            🤔
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            No results found
          </h3>
          <p className="text-slate-400">
            Try a broader search term or select a different tag.
          </p>
        </div>
      ) : logs.length > 0 ? (
        <>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-slate-300">
              {logs.length} result{logs.length > 1 ? "s" : ""} found
            </p>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              Showing up to 20 latest matches
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {logs.map((log) => (
              <LogCard key={log._id} log={log} />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-14 text-center shadow-2xl shadow-slate-950/20">
          <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-5xl text-cyan-300 shadow-inner">
            🌍
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            Ready to explore?
          </h3>
          <p className="text-slate-400">
            Use the search above to start discovering travel stories and
            experiences.
          </p>
        </div>
      )}
    </div>
  );
}
