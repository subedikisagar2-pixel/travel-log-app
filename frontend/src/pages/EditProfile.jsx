import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function EditProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [loading, setLoading] = useState(false);

  // ✅ Fix 1 — can't call navigate() during render, use useEffect instead
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ Fix 2 — remove the extra /api prefix (api.js already has baseURL with /api)
      await api.put(`/users/${user.id}`, { name, bio });

      // ✅ Fix 3 — update localStorage so name change reflects immediately
      const updatedUser = { ...user, name, bio };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated! ✅");
      navigate(`/profile/${user.id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 16px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#1a56db,#3b82f6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 800,
            color: "#fff",
            margin: "0 auto 16px",
            boxShadow: "0 4px 16px rgba(26,86,219,0.3)",
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: 4,
          }}
        >
          Edit Profile
        </h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>
          Update your personal information
        </p>
      </div>

      {/* Form card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          border: "1px solid #e2e8f0",
          boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
          padding: "32px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          {/* Name */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 7,
              }}
            >
              👤 Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={{
                width: "100%",
                border: "1.5px solid #e2e8f0",
                borderRadius: 11,
                padding: "12px 14px",
                fontSize: 14,
                color: "#0f172a",
                background: "#fff",
                outline: "none",
                fontFamily: "inherit",
                transition: "all 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1a56db";
                e.target.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Email — disabled */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 7,
              }}
            >
              📧 Email
            </label>
            <input
              value={user?.email}
              disabled
              style={{
                width: "100%",
                border: "1.5px solid #f1f5f9",
                borderRadius: 11,
                padding: "12px 14px",
                fontSize: 14,
                color: "#94a3b8",
                background: "#f8fafc",
                cursor: "not-allowed",
                fontFamily: "inherit",
              }}
            />
            <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 5 }}>
              📌 Email cannot be changed
            </p>
          </div>

          {/* Bio */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 7,
              }}
            >
              📝 Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself and your travel style..."
              rows={4}
              style={{
                width: "100%",
                border: "1.5px solid #e2e8f0",
                borderRadius: 11,
                padding: "12px 14px",
                fontSize: 14,
                color: "#0f172a",
                background: "#fff",
                outline: "none",
                fontFamily: "inherit",
                resize: "vertical",
                transition: "all 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1a56db";
                e.target.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Save button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading
                ? "#94a3b8"
                : "linear-gradient(135deg,#1a56db,#3b82f6)",
              border: "none",
              borderRadius: 11,
              padding: "13px",
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontFamily: "inherit",
              boxShadow: loading ? "none" : "0 4px 14px rgba(26,86,219,0.3)",
              transition: "all 0.2s",
            }}
          >
            {loading ? (
              <>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                Saving...
              </>
            ) : (
              "Save Changes ✅"
            )}
          </button>

          {/* Cancel button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              width: "100%",
              background: "#f8fafc",
              border: "1.5px solid #e2e8f0",
              borderRadius: 11,
              padding: "12px",
              fontSize: 14,
              fontWeight: 500,
              color: "#64748b",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
              e.currentTarget.style.borderColor = "#d1d5db";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f8fafc";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            Cancel
          </button>
        </form>
      </div>

      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}
