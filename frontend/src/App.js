import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages and components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/home";
import OwnerDashboard from "./pages/OwnerDashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("http://localhost:4000/api/auth/session", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.loggedIn) {
        setUser(data.user);
      }
    };
    checkSession();
  }, []);

  return (
    <div className="App flex">
      <BrowserRouter>
        <Sidebar /> {/* Sidebar on the left */}
        <div className="flex-1">
          <Navbar user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/editprofile" element={<EditProfile user={user} />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
