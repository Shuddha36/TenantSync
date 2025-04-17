import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TenantDashboard = () => {
  const [activeTab, setActiveTab] = useState("currentBookings");
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "currentBookings":
        return <div>Current Bookings Content</div>;
      case "pastBookings":
        return <div>Past Bookings Content</div>;
      case "wishlist":
        return <div>Wishlist Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                activeTab === "currentBookings" ? "bg-gray-600" : ""
              }`}
              onClick={() => setActiveTab("currentBookings")}
            >
              Current Bookings
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                activeTab === "pastBookings" ? "bg-gray-600" : ""
              }`}
              onClick={() => setActiveTab("pastBookings")}
            >
              Past Bookings
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                activeTab === "wishlist" ? "bg-gray-600" : ""
              }`}
              onClick={() => setActiveTab("wishlist")}
            >
              Wishlist
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 rounded"
              onClick={() => navigate("/profile")}
            >
              Personal Information
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 rounded bg-red-500 hover:bg-red-600"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">{renderContent()}</div>
    </div>
  );
};

export default TenantDashboard;
