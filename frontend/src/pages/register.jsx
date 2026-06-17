import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="#24292e"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

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
        {/* Header */}
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
            }}
          >
            Welcome Back
          </h1>
          <p style={{ color: "#64748b", marginTop: 6, fontSize: 14 }}>
            Sign in to continue your journey
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
            padding: "40px 36px",
          }}
        >
          {/* Social buttons */}
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
              style={{
                padding: "11px 16px",
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
                fontWeight: 500,
                fontFamily: "inherit",
                transition: "all 0.2s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f8fafc";
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
              }}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* GitHub */}
            <button
              style={{
                padding: "11px 16px",
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
                fontWeight: 500,
                fontFamily: "inherit",
                transition: "all 0.2s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f8fafc";
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
              }}
            >
              <GitHubIcon />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
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

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
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
                {...register("email", { required: true })}
                type="email"
                placeholder="you@example.com"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              {errors.email && (
                <div style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>
                  ⚠️ Email is required
                </div>
              )}
            </div>

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
                  style={{ fontSize: 12, color: "#1a56db", cursor: "pointer" }}
                >
                  Forgot password?
                </span>
              </div>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="••••••••"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              {errors.password && (
                <div style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>
                  ⚠️ Password is required
                </div>
              )}
            </div>

            {/* Remember me */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                id="remember"
                style={{ width: 15, height: 15, accentColor: "#1a56db" }}
              />
              <label
                htmlFor="remember"
                style={{ fontSize: 13, color: "#64748b", cursor: "pointer" }}
              >
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                background: "linear-gradient(135deg,#1a56db,#3b82f6)",
                border: "none",
                borderRadius: 11,
                padding: "13px",
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontFamily: "inherit",
                boxShadow: "0 4px 14px rgba(26,86,219,0.3)",
                marginTop: 4,
                opacity: isSubmitting ? 0.7 : 1,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting)
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(26,86,219,0.45)";
              }}
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 14px rgba(26,86,219,0.3)")
              }
            >
              {isSubmitting ? (
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
                  Signing in...
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          {/* Footer link */}
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
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Create one free →
            </Link>
          </div>
        </div>

        {/* Trust badges */}
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
            { icon: "🔒", label: "256-bit SSL" },
            { icon: "✅", label: "Free forever" },
            { icon: "📱", label: "Mobile ready" },
          ].map((b) => (
            <div
              key={b.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 12,
                color: "#94a3b8",
              }}
            >
              <span>{b.icon}</span>
              {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
