import React, { useEffect, useState } from "react";
import axios from "axios";

const MyRentalHistory = () => {
  const [rentalRequests, setRentalRequests] = useState([]);

  useEffect(() => {
    const fetchRentalRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/rental-requests/my-requests"
        );
        console.log(response.data);
        setRentalRequests(response.data);
      } catch (error) {
        console.error("Error fetching rental requests:", error);
      }
    };

    fetchRentalRequests();
  }, []);

  return (
    <div className="rental-history p-4">
      <h2 className="text-2xl font-bold mb-4">My Rental History</h2>
      {rentalRequests.length === 0 && (
        <p className="text-gray-500">No rental requests found.</p>
      )}
      <div className="grid grid-cols-1 gap-4">
        {rentalRequests.map((request) => (
          <div
            key={request._id}
            className="rental-card bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-lg font-semibold mb-2">
              {request.property.houseName}
            </h3>
            <p className="text-gray-600 mb-1">
              Address: {request.property.address}
            </p>
            <p className="text-gray-600 mb-1">
              Status:{" "}
              <span
                className={`font-bold ${
                  request.status === "pending"
                    ? "text-blue-500"
                    : request.status === "approved"
                    ? "text-green-500"
                    : ""
                }`}
              >
                {request.status}
              </span>
            </p>
            <p className="text-gray-600 mb-1">
              Requested On: {new Date(request.createdAt).toLocaleDateString()}{" "}
              at {new Date(request.createdAt).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRentalHistory;
