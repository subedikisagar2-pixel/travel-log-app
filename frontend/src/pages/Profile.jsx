import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const TAG_COLORS = {
  adventure: { bg: "#fef3c7", color: "#92400e" },
  budget: { bg: "#dcfce7", color: "#166534" },
  family: { bg: "#dbeafe", color: "#1e40af" },
  luxury: { bg: "#fce7f3", color: "#9d174d" },
  solo: { bg: "#ede9fe", color: "#5b21b6" },
  nature: { bg: "#ccfbf1", color: "#115e59" },
  culture: { bg: "#fff7ed", color: "#9a3412" },
  food: { bg: "#fdf4ff", color: "#86198f" },
};

const BG = [
  "linear-gradient(135deg,#0c447c,#185FA5)",
  "linear-gradient(135deg,#085041,#0F6E56)",
  "linear-gradient(135deg,#412402,#854F0B)",
  "linear-gradient(135deg,#3C3489,#534AB7)",
  "linear-gradient(135deg,#72243E,#993556)",
];

function LogCard({ log, i }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 80) + 5);
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        transition: "all 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ height: 180, position: "relative", overflow: "hidden" }}>
        {log.photos?.[0] ? (
          <img
            src={log.photos[0]}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: BG[i % BG.length],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
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
              "linear-gradient(to top,rgba(0,0,0,0.4),transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            borderRadius: 99,
            padding: "3px 8px",
            fontSize: 11,
            fontWeight: 700,
            color: "#fbbf24",
          }}
        >
          ⭐ {log.rating}.0
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          📍 {log.destination}
        </div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <Link to={`/logs/${log._id}`} style={{ textDecoration: "none" }}>
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 6,
              lineHeight: 1.3,
            }}
            onMouseEnter={(e) => (e.target.style.color = "#1a56db")}
            onMouseLeave={(e) => (e.target.style.color = "#0f172a")}
          >
            {log.title}
          </h3>
        </Link>
        <p
          style={{
            fontSize: 12,
            color: "#64748b",
            lineHeight: 1.5,
            marginBottom: 10,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {log.description}
        </p>
        <div
          style={{
            display: "flex",
            gap: 5,
            flexWrap: "wrap",
            marginBottom: 10,
          }}
        >
          {log.tags?.slice(0, 2).map((t) => {
            const tc = TAG_COLORS[t] || { bg: "#f1f5f9", color: "#334155" };
            return (
              <span
                key={t}
                style={{
                  background: tc.bg,
                  color: tc.color,
                  borderRadius: 99,
                  padding: "2px 8px",
                  fontSize: 10,
                  fontWeight: 600,
                }}
              >
                #{t}
              </span>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 10,
            borderTop: "1px solid #f1f5f9",
          }}
        >
          <button
            onClick={() => {
              setLiked(!liked);
              setLikes((l) => (liked ? l - 1 : l + 1));
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              color: liked ? "#e11d48" : "#94a3b8",
              fontWeight: 500,
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {liked ? "❤️" : "🤍"} {likes}
          </button>
          <Link to={`/logs/${log._id}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "#eff6ff",
                color: "#1a56db",
                borderRadius: 8,
                padding: "4px 12px",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Read →
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const { userId } = useParams();
  const { user: me } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("logs");
  const isOwn = me?.id === userId;

  useEffect(() => {
    api
      .get(`/logs/user/${userId}`)
      .then((r) => setLogs(r.data))
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, [userId]);

  const firstLog = logs[0];
  const avgRating = logs.length
    ? (logs.reduce((a, l) => a + (l.rating || 0), 0) / logs.length).toFixed(1)
    : "—";
  const destinations = [...new Set(logs.map((l) => l.destination))].length;

  const coverImg =
    logs.find((l) => l.photos?.[0])?.photos?.[0] ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80";

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 0 60px" }}>
      {/* Cover */}
      <div
        style={{
          height: 260,
          position: "relative",
          borderRadius: "0 0 28px 28px",
          overflow: "hidden",
          marginBottom: 0,
        }}
      >
        <img
          src={coverImg}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top,rgba(15,23,42,0.8),transparent 50%)",
          }}
        />
        {isOwn && (
          <Link to="/edit-profile" style={{ textDecoration: "none" }}>
            <button
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                borderRadius: 10,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              ✏️ Edit Profile
            </button>
          </Link>
        )}
      </div>

      {/* Profile info */}
      <div style={{ padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 28,
            marginTop: -32,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
            {/* Avatar */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#1a56db,#3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: 28,
                border: "4px solid #fff",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                flexShrink: 0,
              }}
            >
              {firstLog?.user?.name?.charAt(0).toUpperCase() || "?"}
            </div>
            <div style={{ paddingBottom: 4 }}>
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: 2,
                }}
              >
                {firstLog?.user?.name || "Traveler"}
              </h1>
              <p style={{ fontSize: 13, color: "#64748b" }}>
                {logs.length} travel log{logs.length !== 1 ? "s" : ""} ·{" "}
                {destinations} destination{destinations !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          {isOwn && (
            <div style={{ display: "flex", gap: 10 }}>
              <Link to="/create-log" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "linear-gradient(135deg,#1a56db,#3b82f6)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    padding: "10px 20px",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  ✈️ New Log
                </button>
              </Link>
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "#f1f5f9",
                    color: "#374151",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    padding: "10px 20px",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  📊 Dashboard
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 12,
            marginBottom: 28,
          }}
        >
          {[
            { val: logs.length, label: "Logs", icon: "📝" },
            { val: destinations, label: "Destinations", icon: "📍" },
            { val: `${avgRating}⭐`, label: "Avg Rating", icon: "⭐" },
            {
              val: logs.reduce((a, l) => a + (l.photos?.length || 0), 0),
              label: "Photos",
              icon: "📸",
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: "18px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#1a56db" }}>
                {s.val}
              </div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 4,
            background: "#f1f5f9",
            borderRadius: 12,
            padding: 4,
            marginBottom: 24,
            width: "fit-content",
          }}
        >
          {[
            { key: "logs", label: "📝 Logs" },
            { key: "destinations", label: "📍 Destinations" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: "8px 20px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                fontFamily: "inherit",
                transition: "all 0.2s",
                background: tab === t.key ? "#fff" : "transparent",
                color: tab === t.key ? "#1a56db" : "#64748b",
                boxShadow:
                  tab === t.key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Logs tab */}
        {tab === "logs" &&
          (loading ? (
            <div style={{ textAlign: "center", padding: "60px" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "4px solid #e2e8f0",
                  borderTopColor: "#1a56db",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 16px",
                }}
              />
              <p style={{ color: "#64748b" }}>Loading logs...</p>
            </div>
          ) : logs.length === 0 ? (
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 20,
                padding: "60px 24px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 16 }}>🗺️</div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: 8,
                }}
              >
                No logs yet
              </h3>
              <p style={{ color: "#64748b", marginBottom: 20 }}>
                {isOwn
                  ? "Start sharing your travel adventures!"
                  : "This traveler hasn't shared any logs yet."}
              </p>
              {isOwn && (
                <Link to="/create-log" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      background: "linear-gradient(135deg,#1a56db,#3b82f6)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 99,
                      padding: "11px 24px",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    ✈️ Create First Log
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: 20,
              }}
            >
              {logs.map((log, i) => (
                <LogCard key={log._id} log={log} i={i} />
              ))}
            </div>
          ))}

        {/* Destinations tab */}
        {tab === "destinations" && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[...new Set(logs.map((l) => l.destination))].map((d) => (
              <div
                key={d}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: "12px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#bfdbfe";
                  e.currentTarget.style.background = "#eff6ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.background = "#fff";
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  🌍
                </div>
                <div>
                  <div
                    style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}
                  >
                    {d}
                  </div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>
                    {logs.filter((l) => l.destination === d).length} log
                    {logs.filter((l) => l.destination === d).length !== 1
                      ? "s"
                      : ""}
                  </div>
                </div>
              </div>
            ))}
            {logs.length === 0 && (
              <p style={{ color: "#64748b", fontSize: 14 }}>
                No destinations yet.
              </p>
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
