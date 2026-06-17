import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const MAP_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const FEATURED = [
  {
    name: "Nepal",
    lat: 28.3949,
    lng: 84.124,
    color: "#1e40af",
    desc: "Himalayan Adventures",
    logs: 24,
    rating: "4.9",
    tag: "Adventure",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=85",
    pin: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&q=80",
  },
  {
    name: "Bali",
    lat: -8.3405,
    lng: 115.092,
    color: "#166534",
    desc: "Tropical Paradise",
    logs: 18,
    rating: "4.8",
    tag: "Beach",
    img: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600&q=85",
    pin: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=80&q=80",
  },
  {
    name: "Morocco",
    lat: 31.7917,
    lng: -7.0926,
    color: "#92400e",
    desc: "Desert & Culture",
    logs: 15,
    rating: "4.9",
    tag: "Culture",
    img: "https://images.unsplash.com/photo-1539020140153-e479b8a22e7f?w=600&q=85",
    pin: "https://images.unsplash.com/photo-1539020140153-e479b8a22e7f?w=80&q=80",
  },
  {
    name: "Japan",
    lat: 36.2048,
    lng: 138.2529,
    color: "#9d174d",
    desc: "Culture & Cuisine",
    logs: 31,
    rating: "5.0",
    tag: "Culture",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=85",
    pin: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=80&q=80",
  },
  {
    name: "Italy",
    lat: 41.8719,
    lng: 12.5674,
    color: "#5b21b6",
    desc: "History & Art",
    logs: 22,
    rating: "4.8",
    tag: "History",
    img: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=600&q=85",
    pin: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=80&q=80",
  },
  {
    name: "Maldives",
    lat: 3.2028,
    lng: 73.2207,
    color: "#155e75",
    desc: "Ocean Getaway",
    logs: 11,
    rating: "5.0",
    tag: "Luxury",
    img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=85",
    pin: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=80&q=80",
  },
  {
    name: "New York",
    lat: 40.7128,
    lng: -74.006,
    color: "#334155",
    desc: "City Adventures",
    logs: 19,
    rating: "4.7",
    tag: "City",
    img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=85",
    pin: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=80&q=80",
  },
  {
    name: "Brazil",
    lat: -14.235,
    lng: -51.9253,
    color: "#166534",
    desc: "Wild Rainforest",
    logs: 9,
    rating: "4.6",
    tag: "Nature",
    img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=85",
    pin: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=80&q=80",
  },
  {
    name: "Switzerland",
    lat: 46.8182,
    lng: 8.2275,
    color: "#1e40af",
    desc: "Alpine Wonders",
    logs: 14,
    rating: "5.0",
    tag: "Nature",
    img: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=600&q=85",
    pin: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=80&q=80",
  },
  {
    name: "Greece",
    lat: 39.0742,
    lng: 21.8243,
    color: "#1e40af",
    desc: "Mediterranean Bliss",
    logs: 17,
    rating: "4.9",
    tag: "Beach",
    img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=85",
    pin: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=80&q=80",
  },
  {
    name: "Iceland",
    lat: 64.9631,
    lng: -19.0208,
    color: "#155e75",
    desc: "Land of Fire & Ice",
    logs: 8,
    rating: "5.0",
    tag: "Adventure",
    img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=85",
    pin: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=80&q=80",
  },
  {
    name: "Thailand",
    lat: 15.87,
    lng: 100.9925,
    color: "#92400e",
    desc: "Temples & Beaches",
    logs: 21,
    rating: "4.8",
    tag: "Culture",
    img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=85",
    pin: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=80&q=80",
  },
];

const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#f0f4f8" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#374151" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#bfdbfe" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#64748b" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#e2e8f0" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#f1f5f9" }],
  },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d1d5db" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f8fafc" }],
  },
];

const makePhotoPin = (imgUrl, borderColor) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="56" height="68" viewBox="0 0 56 68">
      <defs>
        <clipPath id="cp"><circle cx="28" cy="24" r="20"/></clipPath>
        <filter id="sh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.3"/>
        </filter>
      </defs>
      <path d="M28 2C16 2 6 12 6 24c0 16 22 42 22 42S50 40 50 24C50 12 40 2 28 2z"
        fill="${borderColor}" filter="url(#sh)"/>
      <circle cx="28" cy="24" r="21" fill="white"/>
      <image href="${imgUrl}" x="7" y="3" width="42" height="42"
        clip-path="url(#cp)" preserveAspectRatio="xMidYMid slice"/>
    </svg>
  `)}`;

const communityPin = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="46" viewBox="0 0 38 46">
    <filter id="sh"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-opacity="0.25"/></filter>
    <path d="M19 2C11 2 4 9 4 18c0 13 15 28 15 28S34 31 34 18C34 9 27 2 19 2z"
      fill="#1a56db" filter="url(#sh)"/>
    <circle cx="19" cy="18" r="11" fill="white"/>
    <circle cx="19" cy="18" r="5" fill="#1a56db"/>
  </svg>
`)}`;

const TAG_COLORS = {
  Adventure: { bg: "#fef3c7", color: "#92400e" },
  Beach: { bg: "#cffafe", color: "#155e75" },
  Culture: { bg: "#fce7f3", color: "#9d174d" },
  History: { bg: "#ede9fe", color: "#5b21b6" },
  Luxury: { bg: "#dcfce7", color: "#166534" },
  City: { bg: "#f1f5f9", color: "#334155" },
  Nature: { bg: "#dcfce7", color: "#166534" },
};

export default function MapView() {
  const [logs, setLogs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [mapRef, setMapRef] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: MAP_KEY || "" });

  useEffect(() => {
    api
      .get("/logs", { params: { limit: 50 } })
      .then((r) => setLogs(r.data.logs || []))
      .finally(() => setLoading(false));
  }, []);

  const destinations = [
    ...new Map(logs.map((l) => [l.destination, l])).values(),
  ];

  const flyTo = (lat, lng) => {
    if (mapRef) {
      mapRef.panTo({ lat, lng });
      mapRef.setZoom(6);
    }
  };

  const allTags = ["all", ...new Set(FEATURED.map((d) => d.tag))];

  const filteredFeatured = FEATURED.filter((d) => {
    const matchTag = tagFilter === "all" || d.tag === tagFilter;
    const matchQ =
      searchQ === "" ||
      d.name.toLowerCase().includes(searchQ.toLowerCase()) ||
      d.desc.toLowerCase().includes(searchQ.toLowerCase());
    return matchTag && matchQ;
  });

  const totalLogs = logs.length + FEATURED.reduce((a, b) => a + b.logs, 0);

  return (
    <div style={{ maxWidth: 1140, margin: "0 auto" }}>
      {/* ── HERO WITH IMAGE MOSAIC ── */}
      <div
        style={{
          borderRadius: 24,
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
          minHeight: 280,
        }}
      >
        {/* Background mosaic of destination photos */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "repeat(6,1fr)",
            gap: 2,
          }}
        >
          {FEATURED.slice(0, 6).map((d) => (
            <div key={d.name} style={{ overflow: "hidden" }}>
              <img
                src={d.img}
                alt={d.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.5)",
                }}
              />
            </div>
          ))}
        </div>
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg,rgba(15,23,42,0.85),rgba(29,78,216,0.75))",
          }}
        />
        {/* Content */}
        <div
          style={{
            position: "relative",
            padding: "44px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div style={{ color: "#fff" }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#93c5fd",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              🌍 Interactive World Map
            </div>
            <h1
              style={{
                fontSize: 36,
                fontWeight: 800,
                marginBottom: 10,
                letterSpacing: "-0.5px",
                lineHeight: 1.1,
              }}
            >
              Explore Every Corner
              <br />
              of the World
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 15,
                lineHeight: 1.7,
                maxWidth: 400,
              }}
            >
              {FEATURED.length} destinations pinned by travelers. Click any
              photo marker to read real travel stories.
            </p>
            {/* Search bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 12,
                padding: "10px 16px",
                marginTop: 20,
                maxWidth: 340,
              }}
            >
              <span style={{ fontSize: 16 }}>🔍</span>
              <input
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search destinations..."
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  fontSize: 14,
                  color: "#fff",
                  width: "100%",
                  fontFamily: "inherit",
                }}
              />
            </div>
          </div>
          {/* Stats grid */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {[
              {
                val: FEATURED.length + destinations.length,
                label: "Destinations",
                icon: "📍",
              },
              { val: totalLogs, label: "Travel Logs", icon: "📝" },
              { val: "120+", label: "Countries", icon: "🌍" },
              { val: "4.9★", label: "Avg Rating", icon: "⭐" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 14,
                  padding: "14px 18px",
                  textAlign: "center",
                  minWidth: 110,
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>
                  {s.val}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.6)",
                    marginTop: 3,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 16,
          padding: "14px 20px",
          marginBottom: 20,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#374151",
            marginRight: 4,
          }}
        >
          Show:
        </span>
        {[
          { key: "all", label: "All Destinations" },
          { key: "featured", label: "⭐ Featured" },
          { key: "community", label: "👥 Community" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: "6px 16px",
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              border: "1.5px solid",
              fontFamily: "inherit",
              transition: "all 0.2s",
              borderColor: filter === f.key ? "#1a56db" : "#e2e8f0",
              background:
                filter === f.key
                  ? "linear-gradient(135deg,#1a56db,#3b82f6)"
                  : "#f8fafc",
              color: filter === f.key ? "#fff" : "#64748b",
            }}
          >
            {f.label}
          </button>
        ))}
        <div
          style={{
            width: 1,
            height: 24,
            background: "#e2e8f0",
            margin: "0 4px",
          }}
        />
        <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
          Tag:
        </span>
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setTagFilter(t)}
            style={{
              padding: "6px 14px",
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              border: "1px solid",
              fontFamily: "inherit",
              transition: "all 0.2s",
              borderColor: tagFilter === t ? "#1a56db" : "#e2e8f0",
              background: tagFilter === t ? "#eff6ff" : "transparent",
              color: tagFilter === t ? "#1a56db" : "#64748b",
            }}
          >
            {t === "all" ? "All Tags" : t}
          </button>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 12, color: "#64748b" }}>
          {filteredFeatured.length} destinations shown
        </div>
      </div>

      {/* ── GOOGLE MAP ── */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 24,
          overflow: "hidden",
          marginBottom: 28,
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        }}
      >
        {!MAP_KEY ? (
          <div
            style={{ height: 520, position: "relative", overflow: "hidden" }}
          >
            {/* Blurred background */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 0,
              }}
            >
              {FEATURED.slice(0, 4).map((d) => (
                <img
                  key={d.name}
                  src={d.img}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "blur(8px) brightness(0.6)",
                    transform: "scale(1.05)",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(15,23,42,0.6)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
              }}
            >
              {/* Stacked photos */}
              <div style={{ display: "flex", marginBottom: 8 }}>
                {FEATURED.slice(0, 6).map((d, i) => (
                  <div
                    key={d.name}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "3px solid #fff",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
                      marginLeft: i === 0 ? 0 : -16,
                      zIndex: FEATURED.length - i,
                    }}
                  >
                    <img
                      src={d.img}
                      alt={d.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#1a56db,#3b82f6)",
                    border: "3px solid #fff",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
                    marginLeft: -16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#fff",
                    zIndex: 0,
                  }}
                >
                  +{FEATURED.length - 6}
                </div>
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Enable Google Maps
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.7)",
                  textAlign: "center",
                  maxWidth: 380,
                  lineHeight: 1.7,
                }}
              >
                Add your API key to see all {FEATURED.length} destinations
                pinned on an interactive world map with photo markers
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <a
                  href="https://console.cloud.google.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <button
                    style={{
                      background: "linear-gradient(135deg,#1a56db,#3b82f6)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 99,
                      padding: "12px 26px",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      boxShadow: "0 4px 16px rgba(26,86,219,0.4)",
                    }}
                  >
                    Get Free API Key →
                  </button>
                </a>
                <button
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    borderRadius: 99,
                    padding: "12px 22px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  View Docs
                </button>
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 10,
                  padding: "10px 18px",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <code>VITE_GOOGLE_MAPS_API_KEY=your_key</code> →{" "}
                <code>frontend/.env</code>
              </div>
            </div>
          </div>
        ) : !isLoaded ? (
          <div
            style={{
              height: 520,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f8fafc",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#1a56db,#3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  margin: "0 auto 16px",
                  animation: "pulse 1.5s infinite",
                }}
              >
                🗺️
              </div>
              <div style={{ color: "#374151", fontSize: 16, fontWeight: 600 }}>
                Loading Google Maps...
              </div>
              <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 6 }}>
                Setting up your interactive map
              </div>
            </div>
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "520px" }}
            center={{ lat: 20, lng: 10 }}
            zoom={2}
            options={{
              styles: MAP_STYLES,
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,
              gestureHandling: "cooperative",
              minZoom: 2,
            }}
            onLoad={(map) => setMapRef(map)}
          >
            {/* Featured photo pins */}
            {(filter === "all" || filter === "featured") &&
              filteredFeatured.map((d) => (
                <Marker
                  key={d.name}
                  position={{ lat: d.lat, lng: d.lng }}
                  onClick={() => {
                    setSelected({ ...d, type: "featured" });
                    setActiveCard(d.name);
                    flyTo(d.lat, d.lng);
                  }}
                  icon={{
                    url: makePhotoPin(d.pin, d.color),
                    scaledSize: { width: 56, height: 68 },
                  }}
                />
              ))}

            {/* Community pins */}
            {(filter === "all" || filter === "community") &&
              destinations.map((log) =>
                log.lat && log.lng ? (
                  <Marker
                    key={log._id}
                    position={{
                      lat: parseFloat(log.lat),
                      lng: parseFloat(log.lng),
                    }}
                    onClick={() => setSelected({ ...log, type: "log" })}
                    icon={{
                      url: communityPin,
                      scaledSize: { width: 38, height: 46 },
                    }}
                  />
                ) : null,
              )}

            {/* InfoWindow */}
            {selected && (
              <InfoWindow
                position={
                  selected.type === "featured"
                    ? { lat: selected.lat, lng: selected.lng }
                    : {
                        lat: parseFloat(selected.lat) || 0,
                        lng: parseFloat(selected.lng) || 0,
                      }
                }
                onCloseClick={() => setSelected(null)}
              >
                <div style={{ fontFamily: "Inter,sans-serif", width: 220 }}>
                  {selected.type === "featured" ? (
                    <>
                      {/* Photo */}
                      <div
                        style={{
                          height: 120,
                          borderRadius: 10,
                          overflow: "hidden",
                          marginBottom: 12,
                          position: "relative",
                        }}
                      >
                        <img
                          src={selected.img}
                          alt={selected.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(to top,rgba(0,0,0,0.5),transparent)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 8,
                            left: 8,
                            background: "rgba(255,255,255,0.92)",
                            borderRadius: 99,
                            padding: "3px 10px",
                            fontSize: 11,
                            fontWeight: 700,
                            color: selected.color,
                          }}
                        >
                          {selected.tag}
                        </div>
                      </div>
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 18,
                          color: "#0f172a",
                          marginBottom: 3,
                        }}
                      >
                        {selected.name}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "#64748b",
                          marginBottom: 10,
                        }}
                      >
                        {selected.desc}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          background: "#f8fafc",
                          borderRadius: 10,
                          padding: "10px 12px",
                          marginBottom: 12,
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          <div
                            style={{
                              fontSize: 16,
                              fontWeight: 800,
                              color: "#1a56db",
                            }}
                          >
                            {selected.logs}
                          </div>
                          <div style={{ fontSize: 10, color: "#64748b" }}>
                            Logs
                          </div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div
                            style={{
                              fontSize: 16,
                              fontWeight: 800,
                              color: "#f59e0b",
                            }}
                          >
                            {selected.rating}
                          </div>
                          <div style={{ fontSize: 10, color: "#64748b" }}>
                            Rating
                          </div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div
                            style={{
                              fontSize: 16,
                              fontWeight: 800,
                              color: "#10b981",
                            }}
                          >
                            ✓
                          </div>
                          <div style={{ fontSize: 10, color: "#64748b" }}>
                            Verified
                          </div>
                        </div>
                      </div>
                      <Link to="/" style={{ textDecoration: "none" }}>
                        <button
                          style={{
                            width: "100%",
                            background:
                              "linear-gradient(135deg,#1a56db,#3b82f6)",
                            color: "#fff",
                            border: "none",
                            borderRadius: 10,
                            padding: "10px",
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            boxShadow: "0 3px 10px rgba(26,86,219,0.3)",
                          }}
                        >
                          View All Logs →
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                      {selected.photos?.[0] ? (
                        <div
                          style={{
                            height: 110,
                            borderRadius: 10,
                            overflow: "hidden",
                            marginBottom: 10,
                          }}
                        >
                          <img
                            src={selected.photos[0]}
                            alt={selected.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            height: 80,
                            background:
                              "linear-gradient(135deg,#dbeafe,#eff6ff)",
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 10,
                          }}
                        >
                          <div style={{ fontSize: 32 }}>🌍</div>
                        </div>
                      )}
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 15,
                          color: "#0f172a",
                          marginBottom: 4,
                        }}
                      >
                        {selected.title}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#64748b",
                          marginBottom: 4,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        📍 {selected.destination}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "#f59e0b",
                          marginBottom: 8,
                        }}
                      >
                        {"⭐".repeat(Math.min(selected.rating || 1, 5))}
                      </div>
                      {selected.description && (
                        <div
                          style={{
                            fontSize: 12,
                            color: "#374151",
                            marginBottom: 10,
                            lineHeight: 1.6,
                            background: "#f8fafc",
                            borderRadius: 8,
                            padding: "8px 10px",
                          }}
                        >
                          {selected.description.substring(0, 90)}...
                        </div>
                      )}
                      <Link
                        to={`/logs/${selected._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <button
                          style={{
                            width: "100%",
                            background:
                              "linear-gradient(135deg,#1a56db,#3b82f6)",
                            color: "#fff",
                            border: "none",
                            borderRadius: 10,
                            padding: "10px",
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          Read Full Log →
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>

      {/* ── FEATURED DESTINATIONS GRID ── */}
      <div style={{ marginBottom: 36 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.3px",
              }}
            >
              📸 Featured Destinations
            </h2>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 3 }}>
              Click to fly to on the map
            </p>
          </div>
          <span
            style={{
              fontSize: 13,
              color: "#64748b",
              background: "#f1f5f9",
              borderRadius: 99,
              padding: "4px 12px",
            }}
          >
            {filteredFeatured.length} of {FEATURED.length}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,minmax(0,1fr))",
            gap: 16,
          }}
        >
          {filteredFeatured.map((d) => {
            const tagStyle = TAG_COLORS[d.tag] || {
              bg: "#f1f5f9",
              color: "#334155",
            };
            const isActive = activeCard === d.name;
            const isHover = hoveredCard === d.name;
            return (
              <div
                key={d.name}
                onClick={() => {
                  setActiveCard(d.name);
                  setSelected({ ...d, type: "featured" });
                  if (MAP_KEY && isLoaded) flyTo(d.lat, d.lng);
                }}
                onMouseEnter={() => setHoveredCard(d.name)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: "#fff",
                  border: `2px solid ${isActive ? "#1a56db" : "#e2e8f0"}`,
                  borderRadius: 18,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.28s cubic-bezier(.4,0,.2,1)",
                  transform:
                    isHover || isActive ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: isActive
                    ? "0 0 0 4px rgba(26,86,219,0.12), 0 12px 32px rgba(0,0,0,0.12)"
                    : isHover
                      ? "0 12px 32px rgba(0,0,0,0.1)"
                      : "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                {/* Photo */}
                <div
                  style={{
                    height: 130,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={d.img}
                    alt={d.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                      transform: isHover ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                  {/* Gradient */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top,rgba(0,0,0,0.55),transparent 60%)",
                    }}
                  />
                  {/* Tag */}
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      background: tagStyle.bg,
                      color: tagStyle.color,
                      borderRadius: 99,
                      padding: "3px 10px",
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    {d.tag}
                  </div>
                  {/* Rating */}
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
                    ⭐ {d.rating}
                  </div>
                  {/* Active badge */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        background: "#1a56db",
                        borderRadius: 99,
                        padding: "3px 10px",
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      📍 On Map
                    </div>
                  )}
                  {/* Destination name on photo */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 800,
                      textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {d.name}
                  </div>
                </div>
                {/* Body */}
                <div style={{ padding: "12px 14px" }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#64748b",
                      marginBottom: 8,
                      lineHeight: 1.4,
                    }}
                  >
                    {d.desc}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#22c55e",
                        }}
                      />
                      <span
                        style={{
                          fontSize: 12,
                          color: "#374151",
                          fontWeight: 600,
                        }}
                      >
                        {d.logs} logs
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        color: "#1a56db",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      View {isActive ? "→" : ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── COMMUNITY DESTINATIONS ── */}
      {!loading && destinations.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
              👥 Community Pins
            </h2>
            <span style={{ fontSize: 13, color: "#64748b" }}>
              {destinations.length} pinned by travelers
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
              gap: 14,
            }}
          >
            {destinations.map((log) => (
              <Link
                key={log._id}
                to={`/logs/${log._id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 16,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 28px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 1px 4px rgba(0,0,0,0.04)";
                  }}
                >
                  {log.photos?.[0] ? (
                    <div style={{ height: 90, overflow: "hidden" }}>
                      <img
                        src={log.photos[0]}
                        alt={log.destination}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        height: 90,
                        background: "linear-gradient(135deg,#dbeafe,#eff6ff)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      >
                        🌍
                      </div>
                    </div>
                  )}
                  <div
                    style={{
                      padding: "10px 14px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#0f172a",
                        }}
                      >
                        {log.destination}
                      </div>
                      <div
                        style={{ fontSize: 11, color: "#f59e0b", marginTop: 2 }}
                      >
                        {"⭐".repeat(Math.min(log.rating || 1, 5))}
                      </div>
                    </div>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "#eff6ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        color: "#1a56db",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── EMPTY STATE ── */}
      {!loading && logs.length === 0 && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 20,
            padding: "52px 24px",
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          {/* Overlapping photos */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            {FEATURED.slice(0, 5).map((d, i) => (
              <div
                key={d.name}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid #fff",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                  marginLeft: i === 0 ? 0 : -16,
                  zIndex: 5 - i,
                }}
              >
                <img
                  src={d.img}
                  alt={d.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: 8,
            }}
          >
            Be the First to Pin a Destination
          </h3>
          <p
            style={{
              color: "#64748b",
              fontSize: 14,
              marginBottom: 24,
              maxWidth: 360,
              margin: "0 auto 24px",
              lineHeight: 1.6,
            }}
          >
            Create a travel log and pin your location on the map for others to
            discover!
          </p>
          <Link to="/create-log" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "linear-gradient(135deg,#1a56db,#3b82f6)",
                color: "#fff",
                border: "none",
                borderRadius: 99,
                padding: "13px 30px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 16px rgba(26,86,219,0.35)",
              }}
            >
              ✈️ Create Your First Log
            </button>
          </Link>
        </div>
      )}

      {/* ── HOW TO USE ── */}
      <div
        style={{
          background: "linear-gradient(135deg,#f0f9ff,#eff6ff)",
          border: "1px solid #bfdbfe",
          borderRadius: 20,
          padding: "24px 28px",
          marginBottom: 24,
        }}
      >
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#1e40af",
            marginBottom: 16,
          }}
        >
          💡 How to use the map
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
          }}
        >
          {[
            {
              img: FEATURED[0].img,
              title: "Photo Pins",
              desc: "Featured destinations show real travel photos in the map pins",
            },
            {
              img: FEATURED[1].img,
              title: "Click to Fly",
              desc: "Click any destination card below to zoom the map to that location",
            },
            {
              img: FEATURED[2].img,
              title: "Read the Story",
              desc: "Click any pin to see details and read the full travel log",
            },
          ].map((t) => (
            <div
              key={t.title}
              style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  overflow: "hidden",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={t.img}
                  alt={t.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1e40af",
                    marginBottom: 3,
                  }}
                >
                  {t.title}
                </div>
                <div
                  style={{ fontSize: 12, color: "#3b82f6", lineHeight: 1.55 }}
                >
                  {t.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
