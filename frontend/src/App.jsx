import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/NavBar";

// Test - import pages one by one
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import LogDetail from "./pages/LogDetail";
import CreateLog from "./pages/CreateLog";
import EditLog from "./pages/EditLog";
import NotFound from "./pages/NotFound";

// Optional pages - comment out if missing
import About from "./pages/About";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
import MapView from "./pages/MapView";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Navbar />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/search" element={<Search />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/explore" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logs/:id" element={<LogDetail />} />
            <Route path="/create-log" element={<CreateLog />} />
            <Route path="/edit-log/:id" element={<EditLog />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
