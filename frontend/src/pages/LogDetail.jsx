import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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

function Comment({ c }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        borderRadius: 14,
        padding: "14px 16px",
        marginBottom: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#1a56db,#3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            {c.user?.name?.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>
            {c.user?.name}
          </span>
        </div>
        <span style={{ fontSize: 11, color: "#94a3b8" }}>
          {new Date(c.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>
        {c.content}
      </p>
    </div>
  );
}

export default function LogDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [log, setLog] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get(`/logs/${id}`), api.get(`/comments/${id}`)])
      .then(([logRes, commRes]) => {
        setLog(logRes.data);
        setComments(commRes.data);
        setLikes(Math.floor(Math.random() * 200) + 20);
      })
      .catch(() => toast.error("Failed to load log"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this log permanently?")) return;
    setDeleting(true);
    try {
      await api.delete(`/logs/${id}`);
      toast.success("Log deleted!");
      navigate("/");
    } catch {
      toast.error("Failed to delete");
      setDeleting(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setPosting(true);
    try {
      const { data } = await api.post(`/comments/${id}`, { content: comment });
      setComments((prev) => [data, ...prev]);
      setComment("");
      toast.success("Comment posted!");
    } catch {
      toast.error("Failed to post comment");
    } finally {
      setPosting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("🔗 Link copied to clipboard!");
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "100px 24px" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "4px solid #e2e8f0",
            borderTopColor: "#1a56db",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 16px",
          }}
        />
        <p style={{ color: "#64748b", fontSize: 15 }}>Loading travel log...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );

  if (!log)
    return (
      <div style={{ textAlign: "center", padding: "100px 24px" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🗺️</div>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: 8,
          }}
        >
          Log not found
        </h2>
        <Link to="/">
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
            ← Go Home
          </button>
        </Link>
      </div>
    );

  const isOwner = user?.id === log.user?._id;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px 60px" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* Breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          color: "#64748b",
          marginBottom: 24,
        }}
      >
        <Link
          to="/"
          style={{ color: "#1a56db", textDecoration: "none", fontWeight: 500 }}
        >
          Home
        </Link>
        <span>›</span>
        <span style={{ color: "#94a3b8" }}>📍 {log.destination}</span>
        <span>›</span>
        <span style={{ color: "#0f172a", fontWeight: 500 }}>{log.title}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          {log.tags?.map((t) => {
            const tc = TAG_COLORS[t] || { bg: "#f1f5f9", color: "#334155" };
            return (
              <span
                key={t}
                style={{
                  background: tc.bg,
                  color: tc.color,
                  borderRadius: 99,
                  padding: "4px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                #{t}
              </span>
            );
          })}
        </div>
        <h1
          style={{
            fontSize: 38,
            fontWeight: 900,
            color: "#0f172a",
            letterSpacing: "-0.5px",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          {log.title}
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#1a56db,#3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {log.user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <Link
                to={`/profile/${log.user?._id}`}
                style={{ textDecoration: "none" }}
              >
                <span
                  style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}
                >
                  {log.user?.name}
                </span>
              </Link>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>
                {new Date(log.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "#64748b",
            }}
          >
            📍 {log.destination}
          </div>
          <div style={{ fontSize: 16, color: "#fbbf24" }}>
            {"⭐".repeat(log.rating)}{" "}
            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>
              {log.rating}.0
            </span>
          </div>
        </div>
      </div>

      {/* Photo gallery */}
      {log.photos?.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          {/* Main photo */}
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              height: 440,
              marginBottom: 10,
              position: "relative",
            }}
          >
            <img
              src={log.photos[activePhoto]}
              alt={log.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.3s",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top,rgba(0,0,0,0.2),transparent 70%)",
              }}
            />
            {log.photos.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActivePhoto((p) =>
                      p === 0 ? log.photos.length - 1 : p - 1,
                    )
                  }
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                    border: "none",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    color: "#fff",
                    fontSize: 18,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={() =>
                    setActivePhoto((p) =>
                      p === log.photos.length - 1 ? 0 : p + 1,
                    )
                  }
                  style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                    border: "none",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    color: "#fff",
                    fontSize: 18,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ›
                </button>
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 6,
                  }}
                >
                  {log.photos.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setActivePhoto(i)}
                      style={{
                        width: i === activePhoto ? 20 : 8,
                        height: 8,
                        borderRadius: 99,
                        background:
                          i === activePhoto ? "#fff" : "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Thumbnails */}
          {log.photos.length > 1 && (
            <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
              {log.photos.map((p, i) => (
                <div
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  style={{
                    width: 80,
                    height: 60,
                    borderRadius: 10,
                    overflow: "hidden",
                    flexShrink: 0,
                    cursor: "pointer",
                    border: `2px solid ${i === activePhoto ? "#1a56db" : "transparent"}`,
                    transition: "border 0.2s",
                  }}
                >
                  <img
                    src={p}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 0",
          borderTop: "1px solid #f1f5f9",
          borderBottom: "1px solid #f1f5f9",
          marginBottom: 28,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => {
            setLiked(!liked);
            setLikes((l) => (liked ? l - 1 : l + 1));
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            background: liked ? "#fff1f2" : "#fff",
            color: liked ? "#e11d48" : "#64748b",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
        >
          {liked ? "❤️" : "🤍"} {likes}
        </button>
        <button
          onClick={() => setSaved(!saved)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            background: saved ? "#eff6ff" : "#fff",
            color: saved ? "#1a56db" : "#64748b",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
        >
          {saved ? "🔖 Saved" : "🏷️ Save"}
        </button>
        <button
          onClick={handleShare}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            background: "#fff",
            color: "#64748b",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          🔗 Share
        </button>
        <Link
          to={`/map`}
          style={{ textDecoration: "none", marginLeft: "auto" }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 10,
              border: "1px solid #e2e8f0",
              background: "#fff",
              color: "#64748b",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            🗺️ View on Map
          </button>
        </Link>
        {isOwner && (
          <>
            <button
              onClick={() => navigate(`/edit-log/${id}`)}
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                border: "1px solid #bfdbfe",
                background: "#eff6ff",
                color: "#1a56db",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                border: "1px solid #fecaca",
                background: "#fef2f2",
                color: "#dc2626",
                fontSize: 13,
                fontWeight: 600,
                cursor: deleting ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                opacity: deleting ? 0.6 : 1,
              }}
            >
              {deleting ? "Deleting..." : "🗑️ Delete"}
            </button>
          </>
        )}
      </div>

      {/* Description */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 20,
          padding: "28px",
          marginBottom: 28,
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: 16,
          }}
        >
          📖 The Story
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#374151",
            lineHeight: 1.85,
            whiteSpace: "pre-wrap",
          }}
        >
          {log.description}
        </p>
      </div>

      {/* Map location */}
      {log.lat && log.lng && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 20,
            padding: "24px",
            marginBottom: 28,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 16,
            }}
          >
            📍 Location
          </h2>
          <div
            style={{
              height: 200,
              borderRadius: 14,
              overflow: "hidden",
              background: "linear-gradient(135deg,#dbeafe,#eff6ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              position: "relative",
            }}
          >
            🗺️
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 12,
                background: "#fff",
                borderRadius: 10,
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: 600,
                color: "#1a56db",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              📍 {log.destination} · {parseFloat(log.lat).toFixed(4)},{" "}
              {parseFloat(log.lng).toFixed(4)}
            </div>
          </div>
        </div>
      )}

      {/* Comments */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 20,
          padding: "28px",
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: 20,
          }}
        >
          💬 Comments ({comments.length})
        </h2>

        {/* Comment input */}
        {user ? (
          <form onSubmit={handleComment} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#1a56db,#3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  flexShrink: 0,
                }}
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, display: "flex", gap: 8 }}>
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts on this trip..."
                  style={{
                    flex: 1,
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 12,
                    padding: "10px 14px",
                    fontSize: 14,
                    color: "#0f172a",
                    background: "#f8fafc",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1a56db";
                    e.target.style.background = "#fff";
                    e.target.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.background = "#f8fafc";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="submit"
                  disabled={posting || !comment.trim()}
                  style={{
                    background: "linear-gradient(135deg,#1a56db,#3b82f6)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    padding: "10px 18px",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor:
                      posting || !comment.trim() ? "not-allowed" : "pointer",
                    fontFamily: "inherit",
                    opacity: posting || !comment.trim() ? 0.6 : 1,
                    transition: "all 0.2s",
                    flexShrink: 0,
                  }}
                >
                  {posting ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: "16px",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 10 }}>
              Sign in to leave a comment
            </p>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "linear-gradient(135deg,#1a56db,#3b82f6)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 99,
                  padding: "8px 20px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Sign In
              </button>
            </Link>
          </div>
        )}

        {/* Comments list */}
        {comments.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "32px",
              color: "#94a3b8",
              fontSize: 14,
            }}
          >
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          comments.map((c) => <Comment key={c._id} c={c} />)
        )}
      </div>
    </div>
  );
}
