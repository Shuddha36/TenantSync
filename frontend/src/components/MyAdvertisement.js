// src/components/MyAdvertisement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function MyAdvertisement() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/properties",
          { withCredentials: true }
        );
        setProperties(res.data.properties);
      } catch (err) {
        console.error("Failed to load your advertisements:", err);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        My Advertisements
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {properties.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/properties/${p._id}`)}
            style={{
              cursor: "pointer",
              backgroundColor: "#fff",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            {p.image && (
              <img
                src={`http://localhost:4000${p.image}`}
                alt={p.houseName}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            )}
            <h3 style={{ margin: "10px 0 5px" }}>{p.houseName}</h3>
            <p style={{ fontSize: "14px", marginBottom: "5px" }}>
              {p.address}
            </p>
            <p style={{ fontWeight: "bold" }}>Price: {p.price}৳</p>
          </div>
        ))}
      </div>
    </div>
  );
}
