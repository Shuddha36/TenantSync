// src/components/FlatApproval.js
import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function FlatApproval() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/properties/flat-requests");
        setRequests(res.data.requests);
      } catch (err) {
        console.error("Error fetching rental requests", err);
      }
    };
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const res = await axios.post(`http://localhost:4000/api/properties/flat-requests/${id}`, { action });
      setMessage(res.data.message);
      setRequests(requests.map(r => r._id === id ? { ...r, status: action === "approve" ? "approved" : "rejected" } : r));
    } catch (err) {
      setMessage("Error updating request.");
    }
  };

  return (
    <div>
      <h2>Flat Approval</h2>
      {message && <p>{message}</p>}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {requests.length === 0 && <p>No rental requests.</p>}
        {requests.map((req) => (
          <div key={req._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", width: "250px" }}>
            <img src={req.property.image} alt={req.property.houseName} style={{ width: "100%" }} />
            <h3>{req.property.houseName}</h3>
            <p>Address: {req.property.address}</p>
            <p>Status: {req.status}</p>
            <p>Requested by: {req.tenant.name}</p>
            <p>Email: {req.tenant.email}</p>
            <div>
              <button onClick={() => handleAction(req._id, "approve")} disabled={req.status !== "pending"}>Approve</button>
              <button onClick={() => handleAction(req._id, "reject")} disabled={req.status !== "pending"}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
