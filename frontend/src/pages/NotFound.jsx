import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <div className="text-9xl mb-4">🗺️</div>
      <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-xl text-gray-500 mb-2">
        Oops! This destination doesn't exist.
      </p>
      <p className="text-gray-400 mb-8">
        Looks like you've wandered off the map!
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg"
      >
        ✈️ Back to Home
      </Link>
    </div>
  );
}
