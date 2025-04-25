import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyRentalHistory from "../components/MyRentalHistory";

const TenantDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState("rentalHistory");
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "wishlist") {
      const fetchWishlist = async () => {
        try {
          const response = await fetch("/api/wishlist/" + user.id);
          const data = await response.json();
          setWishlist(data);
        } catch (err) {
          console.error("Failed to fetch wishlist:", err);
        }
      };

      fetchWishlist();
    }
  }, [activeTab]);

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
      case "rentalHistory":
        return <MyRentalHistory />;
      case "wishlist":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
            {wishlist.length === 0 && (
              <p className="text-gray-500">Your wishlist is empty.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlist.map((item) => (
                <div
                  key={item._id}
                  className="border p-4 rounded shadow relative"
                >
                  <button
                    className="absolute top-2 right-2 text-white p-1 rounded-full"
                    onClick={async () => {
                      try {
                        await fetch("/api/wishlist/" + item._id, {
                          method: "DELETE",
                        });
                        setWishlist((prev) =>
                          prev.filter((wish) => wish._id !== item._id)
                        );
                      } catch (err) {
                        console.error("Failed to delete wishlist item:", err);
                      }
                    }}
                  >
                    <img
                      src="/trash-can.png"
                      alt="Delete"
                      className="w-6 h-6"
                    />
                  </button>
                  <img
                    src={item.property.image}
                    alt={item.property.houseName}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-bold">
                    {item.property.houseName}
                  </h3>
                  <p>{item.property.address}</p>
                  <p className="text-sm text-gray-500">
                    Rooms: {item.property.rooms}
                  </p>
                  {item.property.price && (
                    <p className="font-semibold text-green-600">
                      Price: {item.property.price}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
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
                activeTab === "rentalHistory" ? "bg-gray-600" : ""
              }`}
              onClick={() => setActiveTab("rentalHistory")}
            >
              Rental History
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
