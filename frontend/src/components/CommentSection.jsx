import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function CommentSection({ logId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    api.get(`/comments/${logId}`).then((r) => setComments(r.data));
  }, [logId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      const { data } = await api.post(`/comments/${logId}`, { content });
      setComments([data, ...comments]);
      setContent("");
    } catch {
      toast.error("Failed to post comment");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">
        💬 Comments ({comments.length})
      </h3>
      {user && (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Post
          </button>
        </form>
      )}
      <div className="flex flex-col gap-4">
        {comments.map((c) => (
          <div key={c._id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span className="font-semibold text-gray-700">
                {c.user?.name}
              </span>
              <span>{new Date(c.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700">{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
