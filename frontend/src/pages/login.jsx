import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Welcome back! 🎉");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  const onFocus = (e) => {
    e.target.style.borderColor = "#1a56db";
    e.target.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.1)";
  };
  const onBlur = (e) => {
    e.target.style.borderColor = "#e2e8f0";
    e.target.style.boxShadow = "none";
  };

  const inputStyle = {
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
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        background: "linear-gradient(135deg,#f0f9ff,#f8fafc,#f0fdf4)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }} className="float">
            ✈️
          </div>
          <h1
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.5px",
              margin: 0,
            }}
          >
            Welcome Back
          </h1>
          <p
            style={{
              color: "#64748b",
              marginTop: 6,
              fontSize: 14,
              margin: "6px 0 0",
            }}
          >
            Sign in to continue your journey
          </p>
        </div>

        {/* ── Card ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
            padding: "40px 36px",
          }}
        >
          {/* ── Social Buttons ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 20,
            }}
          >
            {/* Google */}
            <button
              type="button"
              onClick={() => toast("Google sign-in coming soon!")}
              style={{
                padding: "11px 10px",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                background: "#fff",
                color: "#374151",
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontWeight: 600,
                fontFamily: "inherit",
                transition: "all 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f8fafc";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
              }}
            >
              {/* Official Google G SVG */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              Google
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => toast("GitHub sign-in coming soon!")}
              style={{
                padding: "11px 10px",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                background: "#fff",
                color: "#24292f",
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontWeight: 600,
                fontFamily: "inherit",
                transition: "all 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#24292f";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "#24292f";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#24292f";
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
              }}
            >
              {/* Official GitHub Octocat SVG */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* ── Divider ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            <span
              style={{ fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap" }}
            >
              or continue with email
            </span>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>

          {/* ── Form ── */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {/* Email */}
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
                Email address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                type="email"
                placeholder="you@example.com"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              {errors.email && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#ef4444",
                    marginTop: 5,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  ⚠️ {errors.email.message}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 7,
                }}
              >
                <label
                  style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}
                >
                  Password
                </label>
                <span
                  style={{
                    fontSize: 12,
                    color: "#1a56db",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                  onClick={() => toast("Password reset coming soon!")}
                >
                  Forgot password?
                </span>
              </div>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                type="password"
                placeholder="••••••••"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              {errors.password && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#ef4444",
                    marginTop: 5,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  ⚠️ {errors.password.message}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                background: isSubmitting
                  ? "#93c5fd"
                  : "linear-gradient(135deg,#1a56db,#3b82f6)",
                border: "none",
                borderRadius: 11,
                padding: "13px",
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontFamily: "inherit",
                boxShadow: isSubmitting
                  ? "none"
                  : "0 4px 14px rgba(26,86,219,0.3)",
                marginTop: 4,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(26,86,219,0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 14px rgba(26,86,219,0.3)";
              }}
            >
              {isSubmitting ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{ animation: "spin 0.8s linear infinite" }}
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          {/* ── Switch to register ── */}
          <div
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#64748b",
              marginTop: 20,
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#1a56db",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Create one free →
            </Link>
          </div>
        </div>

        {/* ── Trust badges ── */}
        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            marginTop: 20,
            flexWrap: "wrap",
          }}
        >
          {[
            { icon: "🔒", label: "Secure" },
            { icon: "✅", label: "Free" },
            { icon: "📱", label: "Mobile Ready" },
          ].map((b) => (
            <span
              key={b.label}
              style={{
                fontSize: 12,
                color: "#94a3b8",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {b.icon} {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Spinner keyframe ── */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .float { animation: float 3s ease-in-out infinite; display: inline-block; }
      `}</style>
    </div>
  );
}
