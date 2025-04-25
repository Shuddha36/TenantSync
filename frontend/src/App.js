import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages and components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import EditProfile from "./pages/EditProfile";
import TenantDashboard from "./pages/TenantDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import Home from "./pages/home";
import PropertyDetails from "./pages/PropertyDetails"; // This will handle reviews and ratings
import AdminDashboard from "./components/AdminDashboard";
import ReportForm from "./pages/ReportForm";
import ReviewForm from "./pages/ReviewForm";  // Review form for submitting reviews
import ReviewList from "./pages/ReviewList";  // List of reviews for a property

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
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/editprofile" element={<EditProfile user={user} />} />
            <Route path="/tenant-dashboard" element={<TenantDashboard user={user} />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="/property/:id" element={<PropertyDetails user={user} />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/report/:id" element={<ReportForm />} />;
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/property/:id" element={<PropertyDetails />}>
              <Route path="reviews" element={<ReviewList />} />  {/* Display reviews */}
              <Route path="review" element={<ReviewForm user={user} />} />  {/* Submit a review */}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;