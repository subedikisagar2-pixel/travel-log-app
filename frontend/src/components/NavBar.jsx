import { Link } from "react-router-dom";
import { Compass, Menu } from "lucide-react";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-cyan-500 p-2 rounded-2xl">
            <Compass className="text-white" size={26} />
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide">
            TravelLog
          </h1>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-slate-300 hover:text-cyan-400 transition font-medium"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="text-slate-300 hover:text-cyan-400 transition font-medium"
          >
            Dashboard
          </Link>

          <Link
            to="/explore"
            className="text-slate-300 hover:text-cyan-400 transition font-medium"
          >
            Explore
          </Link>

          <Link
            to="/profile"
            className="text-slate-300 hover:text-cyan-400 transition font-medium"
          >
            Profile
          </Link>

          {/* LOGIN BUTTON */}
          <Link
            to="/login"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-2xl transition duration-300 font-semibold shadow-lg shadow-cyan-500/20"
          >
            Login
          </Link>
        </div>

        {/* MOBILE MENU */}
        <button className="md:hidden text-white">
          <Menu size={30} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
