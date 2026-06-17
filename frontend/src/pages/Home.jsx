import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const TAGS = [
  "adventure",
  "budget",
  "family",
  "luxury",
  "solo",
  "nature",
  "culture",
  "food",
];

const TAG_COLORS = {
  adventure: "#f97316",
  budget: "#22c55e",
  family: "#3b82f6",
  luxury: "#a855f7",
  solo: "#ec4899",
  nature: "#14b8a6",
  culture: "#f59e0b",
  food: "#ef4444",
};

const getInitialLikes = (log) => {
  const key = log._id || log.id || log.title || "travel";
  const seed = String(key)
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return 8 + (seed % 120);
};

const HERO_DESTINATIONS = [
  {
    name: "Santorini",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
  },
  {
    name: "Bali",
    img: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600&q=80",
  },
  {
    name: "Japan",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
  },
  {
    name: "Nepal",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    name: "Maldives",
    img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80",
  },
  {
    name: "Morocco",
    img: "https://images.unsplash.com/photo-1539020140153-e479b8a22e7f?w=600&q=80",
  },
];

function LogCard({ log }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(() => getInitialLikes(log));

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid #f1f5f9",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          height: 200,
          overflow: "hidden",
          background: "linear-gradient(135deg,#667eea,#764ba2)",
        }}
      >
        {log.photos?.[0] ? (
          <img
            src={log.photos[0]}
            alt={log.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.06)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              background: `linear-gradient(135deg,${TAG_COLORS[log.tags?.[0]] || "#667eea"}22,${TAG_COLORS[log.tags?.[0]] || "#764ba2"}44)`,
            }}
          >
            🌍
          </div>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top,rgba(0,0,0,0.5),transparent 55%)",
          }}
        />
        {/* Rating */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            borderRadius: 50,
            padding: "4px 10px",
            fontSize: 12,
            fontWeight: 700,
            color: "#fbbf24",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          ★ {log.rating}.0
        </div>
        {/* Tag */}
        {log.tags?.[0] && (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: TAG_COLORS[log.tags[0]] || "#667eea",
              borderRadius: 50,
              padding: "4px 10px",
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            #{log.tags[0]}
          </div>
        )}
        {/* Location */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 12,
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          📍 {log.destination}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px" }}>
        <Link to={`/logs/${log._id}`} style={{ textDecoration: "none" }}>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#111827",
              marginBottom: 6,
              lineHeight: 1.3,
              transition: "color 0.2s",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
            onMouseLeave={(e) => (e.target.style.color = "#111827")}
          >
            {log.title}
          </h3>
        </Link>
        <p
          style={{
            fontSize: 13,
            color: "#6b7280",
            lineHeight: 1.6,
            marginBottom: 12,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {log.description}
        </p>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 10,
            borderTop: "1px solid #f9fafb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 11,
                flexShrink: 0,
              }}
            >
              {log.user?.name?.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
              {log.user?.name}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setLiked(!liked);
                setLikes((l) => (liked ? l - 1 : l + 1));
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                color: liked ? "#ef4444" : "#d1d5db",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 3,
                transition: "color 0.2s",
              }}
            >
              {liked ? "❤️" : "🤍"} {likes}
            </button>
            <Link to={`/logs/${log._id}`} style={{ textDecoration: "none" }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#2563eb",
                  background: "#eff6ff",
                  padding: "4px 10px",
                  borderRadius: 8,
                }}
              >
                Read →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid #f1f5f9",
      }}
    >
      <div
        style={{
          height: 200,
          background:
            "linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      />
      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            height: 16,
            background: "#f3f4f6",
            borderRadius: 8,
            width: "70%",
            animation: "shimmer 1.5s infinite",
          }}
        />
        <div
          style={{
            height: 12,
            background: "#f3f4f6",
            borderRadius: 8,
            animation: "shimmer 1.5s infinite",
          }}
        />
        <div
          style={{
            height: 12,
            background: "#f3f4f6",
            borderRadius: 8,
            width: "80%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const feedRef = useRef(null);
  const LIMIT = 9;

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/logs", {
          params: { q: search, tag, page, limit: LIMIT },
        });
        setLogs(data.logs || []);
        setTotal(data.total || 0);
      } catch {
        toast.error("Failed to load logs");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [search, tag, page]);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <style>{`
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          background:
            "linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#1d4ed8 100%)",
          padding: "80px 24px 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blobs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(99,102,241,0.2)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: -60,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(59,130,246,0.15)",
            filter: "blur(50px)",
          }}
        />

        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 50,
              padding: "6px 16px",
              marginBottom: 24,
              fontSize: 13,
              color: "#c7d2fe",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#4ade80",
                display: "inline-block",
              }}
            />
            50,000+ Travelers Worldwide
          </div>

          <h1
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              marginBottom: 20,
              animation: "fadeUp 0.7s ease both",
            }}
          >
            Discover the World's
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#818cf8,#38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Best Adventures
            </span>
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.65)",
              marginBottom: 36,
              lineHeight: 1.7,
              maxWidth: 540,
              margin: "0 auto 36px",
            }}
          >
            Real stories from real travelers. Discover, share and get inspired
            for your next trip.
          </p>

          {/* Search */}
          <div
            style={{
              display: "flex",
              background: "#fff",
              borderRadius: 16,
              padding: 6,
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              maxWidth: 560,
              margin: "0 auto 40px",
              gap: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                padding: "0 12px",
                gap: 8,
              }}
            >
              <span style={{ color: "#9ca3af", fontSize: 18 }}>🔍</span>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Where do you want to go?"
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: 15,
                  color: "#111827",
                  background: "transparent",
                  width: "100%",
                  fontFamily: "inherit",
                  padding: "10px 0",
                }}
              />
            </div>
            <button
              onClick={() =>
                feedRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                background: "linear-gradient(135deg,#4f46e5,#2563eb)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "12px 24px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              Search →
            </button>
          </div>

          {/* Photo mosaic */}
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {HERO_DESTINATIONS.map((d, i) => (
              <div
                key={d.name}
                onClick={() => {
                  setSearch(d.name);
                  setPage(1);
                  feedRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  position: "relative",
                  width: 120,
                  height: 80,
                  borderRadius: 14,
                  overflow: "hidden",
                  cursor: "pointer",
                  flexShrink: 0,
                  border: "2px solid rgba(255,255,255,0.1)",
                  transition: "all 0.3s",
                  animation: `fadeUp 0.6s ${i * 0.08}s ease both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.border =
                    "2px solid rgba(255,255,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.border =
                    "2px solid rgba(255,255,255,0.1)";
                }}
              >
                <img
                  src={d.img}
                  alt={d.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.3)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 6,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {d.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section
        style={{
          background: "#fff",
          borderBottom: "1px solid #f1f5f9",
          padding: "28px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 20,
            textAlign: "center",
          }}
        >
          {[
            { n: total || "15K+", l: "Travel Logs", e: "📝" },
            { n: "120+", l: "Countries", e: "🌍" },
            { n: "50K+", l: "Travelers", e: "👥" },
            { n: "4.9★", l: "Avg Rating", e: "⭐" },
          ].map((s) => (
            <div key={s.l}>
              <div style={{ fontSize: 13, marginBottom: 4 }}>{s.e}</div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#111827",
                  letterSpacing: "-0.5px",
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  marginTop: 2,
                  fontWeight: 500,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEED ── */}
      <section
        ref={feedRef}
        style={{ maxWidth: 1200, margin: "0 auto", padding: "52px 24px 80px" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#111827",
                letterSpacing: "-0.5px",
              }}
            >
              Latest Logs
              {total > 0 && (
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 400,
                    color: "#9ca3af",
                    marginLeft: 8,
                  }}
                >
                  ({total})
                </span>
              )}
            </h2>
          </div>
          {user && (
            <Link to="/create-log" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "linear-gradient(135deg,#4f46e5,#2563eb)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "11px 20px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  boxShadow: "0 4px 12px rgba(79,70,229,0.35)",
                }}
              >
                ✈️ Share Trip
              </button>
            </Link>
          )}
        </div>

        {/* Tag pills */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          {["", ...TAGS].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTag(t);
                setPage(1);
              }}
              style={{
                padding: "7px 16px",
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                border: "2px solid",
                fontFamily: "inherit",
                transition: "all 0.2s",
                borderColor: tag === t ? "#4f46e5" : "#e5e7eb",
                background: tag === t ? "#4f46e5" : "#fff",
                color: tag === t ? "#fff" : "#6b7280",
              }}
            >
              {t === "" ? "All" : `#${t}`}
            </button>
          ))}
        </div>

        {/* Search + filter row */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flex: 1,
              minWidth: 220,
              background: "#fff",
              border: "1.5px solid #e5e7eb",
              borderRadius: 12,
              padding: "10px 14px",
            }}
          >
            <span style={{ color: "#9ca3af" }}>🔍</span>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search destinations or titles..."
              style={{
                border: "none",
                outline: "none",
                fontSize: 14,
                color: "#111827",
                background: "transparent",
                width: "100%",
                fontFamily: "inherit",
              }}
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  fontSize: 16,
                  padding: 0,
                }}
              >
                ✕
              </button>
            )}
          </div>
          <select
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
              setPage(1);
            }}
            style={{
              border: "1.5px solid #e5e7eb",
              borderRadius: 12,
              padding: "10px 14px",
              fontSize: 14,
              color: "#374151",
              background: "#fff",
              outline: "none",
              fontFamily: "inherit",
            }}
          >
            <option value="">All Tags</option>
            {TAGS.map((t) => (
              <option key={t} value={t}>
                #{t}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
              gap: 20,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : logs.length === 0 ? (
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #f1f5f9",
              padding: "72px 24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 56,
                marginBottom: 12,
                animation: "float 3s ease-in-out infinite",
              }}
            >
              🗺️
            </div>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#111827",
                marginBottom: 8,
              }}
            >
              {search || tag ? "No results found" : "No logs yet"}
            </h3>
            <p style={{ color: "#9ca3af", marginBottom: 20, fontSize: 14 }}>
              {search || tag
                ? "Try a different keyword or tag"
                : "Be the first to share an adventure!"}
            </p>
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {(search || tag) && (
                <button
                  onClick={() => {
                    setSearch("");
                    setTag("");
                    setPage(1);
                  }}
                  style={{
                    background: "#f3f4f6",
                    color: "#374151",
                    border: "none",
                    borderRadius: 50,
                    padding: "10px 20px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Clear filters
                </button>
              )}
              <Link to="/create-log" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "linear-gradient(135deg,#4f46e5,#2563eb)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 50,
                    padding: "10px 22px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  + Create Log
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
              gap: 20,
            }}
          >
            {logs.map((log) => (
              <LogCard key={log._id} log={log} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                padding: "9px 18px",
                borderRadius: 10,
                border: "1.5px solid #e5e7eb",
                background: "#fff",
                color: "#374151",
                fontSize: 14,
                fontWeight: 500,
                cursor: page === 1 ? "not-allowed" : "pointer",
                opacity: page === 1 ? 0.4 : 1,
                fontFamily: "inherit",
              }}
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 14,
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                  background:
                    p === page
                      ? "linear-gradient(135deg,#4f46e5,#2563eb)"
                      : "#fff",
                  color: p === page ? "#fff" : "#6b7280",
                  border: p === page ? "none" : "1.5px solid #e5e7eb",
                  boxShadow:
                    p === page ? "0 4px 12px rgba(79,70,229,0.3)" : "none",
                }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                padding: "9px 18px",
                borderRadius: 10,
                border: "1.5px solid #e5e7eb",
                background: "#fff",
                color: "#374151",
                fontSize: 14,
                fontWeight: 500,
                cursor: page === totalPages ? "not-allowed" : "pointer",
                opacity: page === totalPages ? 0.4 : 1,
                fontFamily: "inherit",
              }}
            >
              Next →
            </button>
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      {!user && (
        <section
          style={{
            background: "linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8)",
            padding: "72px 24px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-40px",
              left: "30%",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              filter: "blur(30px)",
            }}
          />
          <div
            style={{ position: "relative", maxWidth: 520, margin: "0 auto" }}
          >
            <div
              style={{
                fontSize: 48,
                marginBottom: 14,
                animation: "float 3s ease-in-out infinite",
              }}
            >
              🌍
            </div>
            <h2
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: "#fff",
                marginBottom: 12,
                letterSpacing: "-0.5px",
              }}
            >
              Start Your Journey
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 16,
                lineHeight: 1.7,
                marginBottom: 28,
              }}
            >
              Join 50,000+ travelers. Free forever.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link to="/register" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "#fff",
                    color: "#4f46e5",
                    border: "none",
                    borderRadius: 50,
                    padding: "14px 32px",
                    fontSize: 15,
                    fontWeight: 800,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  }}
                >
                  🚀 Join Free
                </button>
              </Link>
              <Link to="/about" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    borderRadius: 50,
                    padding: "14px 28px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background: "#111827", padding: "40px 24px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                background: "linear-gradient(135deg,#4f46e5,#2563eb)",
                borderRadius: 9,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
              }}
            >
              ✈️
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>
              TravelLog
            </span>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              ["Home", "/"],
              ["Explore", "/explore"],
              ["Map", "/map"],
              ["About", "/about"],
              ["Login", "/login"],
            ].map(([l, to]) => (
              <Link
                key={to}
                to={to}
                style={{
                  color: "#6b7280",
                  fontSize: 13,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#fff")}
                onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
              >
                {l}
              </Link>
            ))}
          </div>
          <span style={{ color: "#374151", fontSize: 12 }}>
            © 2026 TravelLog
          </span>
        </div>
      </footer>
    </div>
  );
}
