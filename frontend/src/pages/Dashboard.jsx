import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";

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

function LogRow({ log, onDelete }) {
  const navigate = useNavigate();
  const [del, setDel] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete this log?")) return;
    setDel(true);
    try {
      await api.delete(`/logs/${log._id}`);
      toast.success("Deleted!");
      onDelete(log._id);
    } catch {
      toast.error("Failed");
      setDel(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "#fff",
        borderRadius: 16,
        padding: "14px 16px",
        border: "1px solid #f1f5f9",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {/* Thumb */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          overflow: "hidden",
          flexShrink: 0,
          background: "linear-gradient(135deg,#ede9fe,#dbeafe)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
        }}
      >
        {log.photos?.[0] ? (
          <img
            src={log.photos[0]}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          "🌍"
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: "#111827",
            marginBottom: 3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {log.title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#9ca3af",
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <span>📍 {log.destination}</span>
          <span>📅 {new Date(log.date).toLocaleDateString()}</span>
          <span style={{ color: "#fbbf24" }}>{"★".repeat(log.rating)}</span>
        </div>
        {log.tags?.[0] && (
          <span
            style={{
              marginTop: 5,
              display: "inline-block",
              background: `${TAG_COLORS[log.tags[0]]}18`,
              color: TAG_COLORS[log.tags[0]] || "#374151",
              borderRadius: 50,
              padding: "2px 8px",
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            #{log.tags[0]}
          </span>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
        <Link to={`/logs/${log._id}`} style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "#f9fafb",
              color: "#374151",
              border: "1px solid #e5e7eb",
              borderRadius: 9,
              padding: "7px 12px",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            View
          </button>
        </Link>
        <button
          onClick={() => navigate(`/edit-log/${log._id}`)}
          style={{
            background: "#eff6ff",
            color: "#2563eb",
            border: "none",
            borderRadius: 9,
            padding: "7px 12px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={del}
          style={{
            background: "#fef2f2",
            color: "#dc2626",
            border: "none",
            borderRadius: 9,
            padding: "7px 12px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            opacity: del ? 0.5 : 1,
          }}
        >
          {del ? "..." : "Del"}
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("logs");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    api
      .get(`/logs/user/${user.id}`)
      .then((r) => setLogs(r.data))
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const avgRating = logs.length
    ? (logs.reduce((a, l) => a + (l.rating || 0), 0) / logs.length).toFixed(1)
    : "—";
  const dests = [...new Set(logs.map((l) => l.destination))].length;
  const photos = logs.reduce((a, l) => a + (l.photos?.length || 0), 0);
  const removeLog = (id) => setLogs((p) => p.filter((l) => l._id !== id));

  const TABS = [
    { k: "logs", l: "📝 Logs" },
    { k: "stats", l: "📊 Stats" },
    { k: "account", l: "⚙️ Account" },
  ];

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px 60px" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* ── HERO ── */}
      <div
        style={{
          background: "linear-gradient(135deg,#1e1b4b,#312e81,#1d4ed8)",
          borderRadius: 24,
          padding: "36px 32px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#818cf8",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Dashboard
            </div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#fff",
                marginBottom: 4,
                letterSpacing: "-0.5px",
              }}
            >
              Hey, {user?.name?.split(" ")[0]} 👋
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
              Your travel stories at a glance
            </p>
          </div>
          <Link to="/create-log" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "#fff",
                color: "#4f46e5",
                border: "none",
                borderRadius: 12,
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
              }}
            >
              ✈️ New Log
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 10,
          }}
        >
          {[
            { i: "📝", v: logs.length, l: "Logs" },
            { i: "⭐", v: avgRating, l: "Rating" },
            { i: "📍", v: dests, l: "Places" },
            { i: "📸", v: photos, l: "Photos" },
          ].map((s) => (
            <div
              key={s.l}
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "16px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.i}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>
                {s.v}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.5)",
                  marginTop: 3,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TABS ── */}
      <div
        style={{
          display: "flex",
          gap: 4,
          background: "#f3f4f6",
          borderRadius: 12,
          padding: 4,
          marginBottom: 20,
          width: "fit-content",
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            style={{
              padding: "8px 18px",
              borderRadius: 9,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              fontFamily: "inherit",
              transition: "all 0.2s",
              background: tab === t.k ? "#fff" : "transparent",
              color: tab === t.k ? "#4f46e5" : "#6b7280",
              boxShadow: tab === t.k ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {t.l}
          </button>
        ))}
      </div>

      {/* ── LOGS ── */}
      {tab === "logs" &&
        (loading ? (
          <div style={{ textAlign: "center", padding: 60 }}>
            <div
              style={{
                width: 36,
                height: 36,
                border: "3px solid #e5e7eb",
                borderTopColor: "#4f46e5",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 12px",
              }}
            />
            <p style={{ color: "#9ca3af", fontSize: 14 }}>Loading...</p>
          </div>
        ) : logs.length === 0 ? (
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #f1f5f9",
              padding: "56px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#111827",
                marginBottom: 8,
              }}
            >
              No logs yet!
            </h3>
            <p style={{ color: "#9ca3af", marginBottom: 20, fontSize: 14 }}>
              Start documenting your adventures
            </p>
            <Link to="/create-log" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "linear-gradient(135deg,#4f46e5,#2563eb)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 50,
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
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {logs.map((log) => (
              <LogRow key={log._id} log={log} onDelete={removeLog} />
            ))}
          </div>
        ))}

      {/* ── STATS ── */}
      {tab === "stats" && (
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {/* Overview */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #f1f5f9",
              padding: 24,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#111827",
                marginBottom: 18,
              }}
            >
              📊 Overview
            </h3>
            {[
              { l: "Total Logs", v: logs.length },
              { l: "Destinations", v: dests },
              { l: "Photos", v: photos },
              { l: "Avg Rating", v: `${avgRating} ⭐` },
              {
                l: "Tags Used",
                v: [...new Set(logs.flatMap((l) => l.tags || []))].length,
              },
            ].map((s) => (
              <div
                key={s.l}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #f9fafb",
                }}
              >
                <span style={{ fontSize: 13, color: "#6b7280" }}>{s.l}</span>
                <span
                  style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}
                >
                  {s.v}
                </span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #f1f5f9",
              padding: 24,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#111827",
                marginBottom: 18,
              }}
            >
              🏷️ Top Tags
            </h3>
            {(() => {
              const tc = {};
              logs.forEach((l) =>
                l.tags?.forEach((t) => (tc[t] = (tc[t] || 0) + 1)),
              );
              const sorted = Object.entries(tc)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);
              const max = sorted[0]?.[1] || 1;
              return sorted.length ? (
                sorted.map(([t, c]) => (
                  <div key={t} style={{ marginBottom: 12 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: TAG_COLORS[t] || "#374151",
                        }}
                      >
                        #{t}
                      </span>
                      <span style={{ fontSize: 12, color: "#9ca3af" }}>
                        {c}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        background: "#f3f4f6",
                        borderRadius: 99,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${(c / max) * 100}%`,
                          background: TAG_COLORS[t] || "#4f46e5",
                          borderRadius: 99,
                          transition: "width 0.5s",
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#9ca3af", fontSize: 13 }}>No tags yet.</p>
              );
            })()}
          </div>

          {/* Destinations */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #f1f5f9",
              padding: 24,
              gridColumn: "1/-1",
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#111827",
                marginBottom: 16,
              }}
            >
              📍 Your Destinations
            </h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[...new Set(logs.map((l) => l.destination))].map((d) => (
                <div
                  key={d}
                  style={{
                    background: "#eff6ff",
                    color: "#2563eb",
                    borderRadius: 50,
                    padding: "7px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    border: "1px solid #bfdbfe",
                  }}
                >
                  📍 {d}
                </div>
              ))}
              {dests === 0 && (
                <p style={{ color: "#9ca3af", fontSize: 13 }}>
                  No destinations yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── ACCOUNT ── */}
      {tab === "account" && (
        <div style={{ maxWidth: 440 }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #f1f5f9",
              padding: 24,
              marginBottom: 16,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#111827",
                marginBottom: 18,
              }}
            >
              👤 Profile
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 20,
                paddingBottom: 18,
                borderBottom: "1px solid #f9fafb",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#4f46e5,#2563eb)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 22,
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div
                  style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}
                >
                  {user?.name}
                </div>
                <div style={{ fontSize: 13, color: "#9ca3af" }}>
                  {user?.email}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link to="/edit-profile" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg,#4f46e5,#2563eb)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    padding: "11px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  ✏️ Edit Profile
                </button>
              </Link>
              <Link
                to={`/profile/${user?.id}`}
                style={{ textDecoration: "none" }}
              >
                <button
                  style={{
                    width: "100%",
                    background: "#f9fafb",
                    color: "#374151",
                    border: "1px solid #e5e7eb",
                    borderRadius: 12,
                    padding: "11px",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  👁️ View Profile
                </button>
              </Link>
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #f1f5f9",
              padding: 24,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#111827",
                marginBottom: 14,
              }}
            >
              ⚡ Quick Links
            </h3>
            {[
              { l: "Create New Log", to: "/create-log", i: "✈️" },
              { l: "Explore Feed", to: "/explore", i: "🧭" },
              { l: "Map View", to: "/map", i: "🗺️" },
              { l: "Trending", to: "/trending", i: "🔥" },
            ].map((a) => (
              <Link key={a.to} to={a.to} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "11px 14px",
                    borderRadius: 12,
                    border: "1px solid #f3f4f6",
                    background: "#f9fafb",
                    marginBottom: 8,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#c7d2fe";
                    e.currentTarget.style.background = "#eff6ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#f3f4f6";
                    e.currentTarget.style.background = "#f9fafb";
                  }}
                >
                  <span style={{ fontSize: 16 }}>{a.i}</span>
                  <span
                    style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}
                  >
                    {a.l}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      color: "#d1d5db",
                      fontSize: 14,
                    }}
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
