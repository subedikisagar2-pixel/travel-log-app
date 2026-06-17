import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const STATS = [
  { num: "10K+", label: "Travelers", icon: "👥" },
  { num: "50K+", label: "Travel Logs", icon: "📝" },
  { num: "120+", label: "Countries", icon: "🌍" },
  { num: "4.9★", label: "Avg Rating", icon: "⭐" },
];
const FEATURES = [
  {
    icon: "📝",
    title: "Rich Travel Logs",
    desc: "Write detailed stories with photos, tips and ratings.",
  },
  {
    icon: "🗺️",
    title: "Google Maps",
    desc: "Pin your exact location on an interactive world map.",
  },
  {
    icon: "👥",
    title: "Community",
    desc: "Follow, like, comment and connect with travelers.",
  },
  {
    icon: "🔍",
    title: "Smart Search",
    desc: "Find logs by destination, tag or traveler instantly.",
  },
  {
    icon: "📸",
    title: "Photo Galleries",
    desc: "Upload up to 5 photos per log. Show what you saw.",
  },
  {
    icon: "🔒",
    title: "Private & Secure",
    desc: "Full control over your data. Always yours.",
  },
];
const DESTINATIONS = [
  {
    name: "Nepal",
    emoji: "🏔️",
    logs: 24,
    rating: "4.9",
    bg: "#dbeafe",
    color: "#1e40af",
  },
  {
    name: "Bali",
    emoji: "🌴",
    logs: 18,
    rating: "4.8",
    bg: "#dcfce7",
    color: "#166534",
  },
  {
    name: "Morocco",
    emoji: "🏜️",
    logs: 15,
    rating: "4.9",
    bg: "#fef3c7",
    color: "#92400e",
  },
  {
    name: "Japan",
    emoji: "🗼",
    logs: 31,
    rating: "5.0",
    bg: "#fce7f3",
    color: "#9d174d",
  },
  {
    name: "Italy",
    emoji: "🏛️",
    logs: 22,
    rating: "4.8",
    bg: "#ede9fe",
    color: "#5b21b6",
  },
  {
    name: "Maldives",
    emoji: "🌊",
    logs: 11,
    rating: "5.0",
    bg: "#cffafe",
    color: "#155e75",
  },
];
const TEAM = [
  {
    initials: "AK",
    name: "Aarav Kumar",
    role: "Founder & CEO",
    bio: "40+ countries. Built TravelLog to share every adventure.",
    bg: "#dbeafe",
    color: "#1e40af",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    role: "Head of Design",
    bio: "UX designer crafting beautiful travel experiences.",
    bg: "#dcfce7",
    color: "#166534",
  },
  {
    initials: "RT",
    name: "Rayan Tahir",
    role: "Lead Engineer",
    bio: "Full-stack developer powering every smooth interaction.",
    bg: "#fef3c7",
    color: "#92400e",
  },
];
const TESTIMONIALS = [
  {
    av: "AK",
    name: "Aarav Kumar",
    role: "Adventure Traveler · Nepal",
    text: "TravelLog helped me document all my Himalayan treks. The Google Maps feature is incredible!",
    bg: "#dbeafe",
    color: "#1e40af",
  },
  {
    av: "PS",
    name: "Priya Sharma",
    role: "Budget Explorer · Bali",
    text: "Found the best hidden gems in Bali. Saved so much money using budget tips from the community!",
    bg: "#dcfce7",
    color: "#166534",
  },
  {
    av: "RT",
    name: "Rayan Tahir",
    role: "Luxury Traveler · Morocco",
    text: "The photo galleries and detailed logs make planning my trips so much easier. Love this platform!",
    bg: "#fef3c7",
    color: "#92400e",
  },
];

export default function About() {
  const { user } = useAuth();
  return (
    <div style={{ margin: "0 -24px" }}>
      {/* HERO */}
      <section
        style={{
          background:
            "linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#1d4ed8 100%)",
          padding: "96px 24px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-40px",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <div
          style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}
          className="fade-up"
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 99,
              padding: "6px 18px",
              fontSize: 13,
              color: "#bfdbfe",
              marginBottom: 24,
              backdropFilter: "blur(10px)",
            }}
          >
            ✈️ &nbsp; The #1 Travel Community Platform — 2026
          </div>
          <h1
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#fff",
              marginBottom: 16,
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            Share Adventures.
            <br />
            <span style={{ color: "#93c5fd" }}>Inspire the World.</span>
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "#94a3b8",
              marginBottom: 36,
              lineHeight: 1.7,
              maxWidth: 500,
              margin: "0 auto 36px",
            }}
          >
            Join thousands documenting journeys, discovering hidden gems, and
            building a global travel community — powered by Google Maps.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to={user ? "/create-log" : "/register"}
              style={{ textDecoration: "none" }}
            >
              <button
                className="btn btn-white"
                style={{
                  fontSize: 15,
                  padding: "14px 32px",
                  fontFamily: "inherit",
                }}
              >
                🚀 {user ? "Create a Log" : "Get Started Free"}
              </button>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  borderRadius: 99,
                  padding: "14px 32px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                🌍 Explore Logs
              </button>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              marginTop: 48,
              flexWrap: "wrap",
            }}
          >
            {DESTINATIONS.slice(0, 5).map((d) => (
              <div
                key={d.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 99,
                  padding: "8px 16px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span style={{ fontSize: 18 }}>{d.emoji}</span>
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>
                  {d.name}
                </span>
                <span
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: "#bfdbfe",
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 99,
                  }}
                >
                  {d.logs} logs
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        style={{
          background: "#fff",
          borderBottom: "1px solid #e2e8f0",
          padding: "52px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 32,
            textAlign: "center",
          }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="fade-up">
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#1a56db",
                  marginBottom: 4,
                  letterSpacing: "-0.5px",
                }}
              >
                {s.num}
              </div>
              <div style={{ color: "#64748b", fontSize: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section
        style={{
          background: "#f8fafc",
          padding: "72px 24px",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="badge" style={{ marginBottom: 16 }}>
              📍 Popular Destinations
            </div>
            <h2
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: 12,
                letterSpacing: "-0.5px",
              }}
            >
              Explore the World's Best Places
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: 16,
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              Authentic travel logs from the most loved destinations worldwide
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
            }}
          >
            {DESTINATIONS.map((d) => (
              <div
                key={d.name}
                className="card"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 48px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 1px 8px rgba(0,0,0,0.06)";
                }}
              >
                <div
                  style={{
                    height: 160,
                    background: d.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 56,
                    position: "relative",
                  }}
                >
                  {d.emoji}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "rgba(255,255,255,0.9)",
                      borderRadius: 99,
                      padding: "4px 10px",
                      fontSize: 12,
                      fontWeight: 700,
                      color: d.color,
                    }}
                  >
                    ⭐ {d.rating}
                  </div>
                </div>
                <div
                  style={{
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ fontSize: 17, fontWeight: 700, color: "#0f172a" }}
                  >
                    {d.name}
                  </div>
                  <span
                    style={{
                      background: d.bg,
                      color: d.color,
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "4px 12px",
                      borderRadius: 99,
                    }}
                  >
                    {d.logs} logs
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        style={{
          background: "#fff",
          padding: "72px 24px",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="badge" style={{ marginBottom: 16 }}>
              ✨ Features
            </div>
            <h2
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.5px",
                marginBottom: 12,
              }}
            >
              Everything You Need
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: 16,
                maxWidth: 440,
                margin: "0 auto",
              }}
            >
              Powerful tools to document, share and discover travel stories
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 16,
                  padding: "28px 24px",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#bfdbfe";
                  e.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(26,86,219,0.08)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    marginBottom: 16,
                  }}
                >
                  {f.icon}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}
                >
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section
        style={{
          background: "#f8fafc",
          padding: "72px 24px",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="badge" style={{ marginBottom: 16 }}>
              👥 Our Team
            </div>
            <h2
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.5px",
                marginBottom: 12,
              }}
            >
              Built by Travelers
            </h2>
            <p style={{ color: "#64748b", fontSize: 16 }}>
              People who live and breathe every adventure
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
            }}
          >
            {TEAM.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 20,
                  padding: "32px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: t.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: t.color,
                    fontWeight: 800,
                    fontSize: 18,
                    margin: "0 auto 16px",
                  }}
                >
                  {t.initials}
                </div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: 4,
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#1a56db",
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  {t.role}
                </div>
                <div
                  style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}
                >
                  {t.bio}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        style={{
          background: "#fff",
          padding: "72px 24px",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="badge" style={{ marginBottom: 16 }}>
              💬 Testimonials
            </div>
            <h2
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.5px",
              }}
            >
              Loved by Travelers
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 20,
                  padding: "28px 24px",
                }}
              >
                <div
                  style={{ color: "#f59e0b", fontSize: 18, marginBottom: 16 }}
                >
                  ⭐⭐⭐⭐⭐
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#374151",
                    lineHeight: 1.7,
                    marginBottom: 20,
                    fontStyle: "italic",
                  }}
                >
                  "{t.text}"
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    borderTop: "1px solid #e2e8f0",
                    paddingTop: 16,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: t.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: t.color,
                      fontWeight: 700,
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {t.av}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      {t.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg,#0f172a,#1e3a8a,#1d4ed8)",
          padding: "88px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }} className="float">
            🌍
          </div>
          <h2
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: "#fff",
              marginBottom: 16,
              letterSpacing: "-0.5px",
            }}
          >
            Ready to Start?
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: 17,
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 440,
              margin: "0 auto 36px",
            }}
          >
            Join 10,000+ travelers sharing stories on TravelLog. Free forever.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 28,
            }}
          >
            <Link
              to={user ? "/create-log" : "/register"}
              style={{ textDecoration: "none" }}
            >
              <button
                className="btn btn-white"
                style={{
                  fontSize: 16,
                  padding: "16px 36px",
                  fontFamily: "inherit",
                }}
              >
                🚀 {user ? "Share Your Trip" : "Join Free Today"}
              </button>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  borderRadius: 99,
                  padding: "16px 36px",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                🌍 Browse Logs
              </button>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              "✅ Free Forever",
              "🔒 Secure",
              "📱 Mobile Ready",
              "⚡ Instant Setup",
            ].map((b) => (
              <span
                key={b}
                style={{ color: "#64748b", fontSize: 13, fontWeight: 500 }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0f172a", padding: "52px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 40,
              marginBottom: 40,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    background: "linear-gradient(135deg,#1a56db,#3b82f6)",
                    borderRadius: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  ✈️
                </div>
                <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>
                  TravelLog
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "#64748b",
                  lineHeight: 1.7,
                  maxWidth: 240,
                }}
              >
                Share your adventures. Inspire the world. The #1 platform for
                real travel stories.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Home", "Explore", "Map", "Trending", "Dashboard"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Cookies", "Security"],
              },
            ].map((col) => (
              <div key={col.title}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#94a3b8",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  {col.title}
                </div>
                {col.links.map((l) => (
                  <Link
                    key={l}
                    to="/"
                    style={{
                      display: "block",
                      color: "#64748b",
                      fontSize: 14,
                      marginBottom: 10,
                      textDecoration: "none",
                    }}
                  >
                    {l}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid #1e293b",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#475569", fontSize: 13 }}>
              © 2026 TravelLog · Built with ❤️ for travelers worldwide
            </span>
            <span style={{ color: "#475569", fontSize: 13 }}>
              React + Node.js + MongoDB
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
