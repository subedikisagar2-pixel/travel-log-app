import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const TAG_COLORS = {
  adventure: "bg-orange-100 text-orange-700",
  budget: "bg-green-100 text-green-700",
  family: "bg-purple-100 text-purple-700",
  luxury: "bg-yellow-100 text-yellow-700",
  solo: "bg-blue-100 text-blue-700",
  nature: "bg-teal-100 text-teal-700",
};

const DEST_EMOJIS = ["🏔️", "🌊", "🏙️", "🌴", "🗺️", "🏰", "🌋", "🏝️"];
const randomEmoji = (str) =>
  DEST_EMOJIS[str?.length % DEST_EMOJIS.length] || "🌍";

export default function LogCard({ log }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50));

  const handleLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
    setLikes((l) => (liked ? l - 1 : l + 1));
    toast(liked ? "Unliked" : "❤️ Liked!", { duration: 1000 });
  };

  const handleShare = (e) => {
    e.preventDefault();
    const url = `${window.location.origin}/logs/${log._id}`;
    navigator.clipboard.writeText(url);
    toast.success("🔗 Link copied to clipboard!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Image */}
      {log.photos?.[0] ? (
        <div className="relative overflow-hidden h-48">
          <img
            src={log.photos[0]}
            alt={log.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-bold text-yellow-500 shadow">
            {"⭐".repeat(log.rating)}
          </div>
        </div>
      ) : (
        <div
          className="h-48 flex items-center justify-center text-6xl relative"
          style={{ background: "linear-gradient(135deg,#dbeafe,#ede9fe)" }}
        >
          {randomEmoji(log.destination)}
          <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-bold text-yellow-500 shadow">
            {"⭐".repeat(log.rating)}
          </div>
        </div>
      )}

      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition">
          {log.title}
        </h2>
        <p className="text-sm text-gray-500 mb-2">📍 {log.destination}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
          {log.description}
        </p>

        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          {log.tags?.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${TAG_COLORS[tag] || "bg-gray-100 text-gray-600"}`}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
              {log.user?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-gray-500">{log.user?.name}</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Like button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs font-medium transition ${liked ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
            >
              {liked ? "❤️" : "🤍"} {likes}
            </button>
            {/* Share button */}
            <button
              onClick={handleShare}
              className="text-gray-400 hover:text-blue-500 transition text-xs font-medium flex items-center gap-1"
            >
              🔗 Share
            </button>
            <Link
              to={`/logs/${log._id}`}
              className="text-sm text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              Read →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
