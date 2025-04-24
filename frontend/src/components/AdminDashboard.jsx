// frontend/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchReports();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      setUsers(res.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get("/api/admin/reports");
      setReports(res.data.reports);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`/api/admin/users/${id}`);
      fetchUsers(); // Refresh user list after deletion
    }
  };

  const viewPropertyDetails = async (propertyId) => {
    try {
      const res = await axios.get(`/api/properties/${propertyId}`);
      setSelectedProperty(res.data.property);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch property details:", err);
    }
  };

  return (
    <div className="p-6">
      {/* ================= USERS ================= */}
      <h2 className="text-2xl font-bold mb-4">👥 All Users</h2>
      <table className="w-full mb-8 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="text-center border-t">
              <td className="p-2">{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => deleteUser(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= REPORTS ================= */}
      <h2 className="text-2xl font-bold mb-4">📩 User Reports</h2>
      {reports.map((r) => (
        <div
          key={r._id}
          className="border rounded-md p-4 mb-4 shadow bg-white"
        >
          <p className="font-semibold">
            {r.reportedBy?.username || "Unknown"} ({r.reportedBy?.role})
          </p>
          <p className="text-gray-800 my-2">"{r.description}"</p>

          {r.propertyId && (
            <p className="text-gray-700 mt-1">
              🏠 <strong>Reported Property:</strong>{" "}
              {r.propertyId.houseName || "N/A"}
            </p>
          )}

          <p className="text-xs text-gray-500 mt-1">
            Reported on {new Date(r.createdAt).toLocaleString()}
          </p>

          <button
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => viewPropertyDetails(r.propertyId._id)}
          >
            View Details
          </button>
        </div>
      ))}

      {/* ================= PROPERTY MODAL ================= */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-3">{selectedProperty.houseName}</h3>
            <img
              src={selectedProperty.image}
              alt="Property"
              className="w-full h-48 object-cover rounded mb-3"
            />

            <p><strong>Address:</strong> {selectedProperty.address}</p>
            <p><strong>Rooms:</strong> {selectedProperty.rooms}</p>
            <p><strong>Bedrooms:</strong> {selectedProperty.bedrooms}</p>
            <p><strong>Kitchens:</strong> {selectedProperty.kitchens}</p>
            <p><strong>Washrooms:</strong> {selectedProperty.washrooms}</p>
            <p><strong>Square Feet:</strong> {selectedProperty.squareFeet} sqft</p>
            <p><strong>Rent Days:</strong> {selectedProperty.rentDays} days</p>
            <p><strong>Price:</strong> ৳{selectedProperty.price}</p>

            <hr className="my-3" />

            

            <p className="text-xs text-gray-500 mt-2">
              Posted on {new Date(selectedProperty.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
