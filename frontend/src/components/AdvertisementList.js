// src/components/AdvertisementList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function AdvertisementList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await axios.get("https://tenantsync-backend.onrender.com/api/properties/");
        setProperties(res.data.properties);
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    }
    fetchProperties();
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Your Advertisements</h2>
      {properties.length === 0 ? (
        <p style={{ textAlign: "center" }}>No advertisements found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {properties.map((property) => (
            <div key={property._id} style={{ 
              border: "1px solid #ccc", 
              padding: "10px", 
              borderRadius: "8px", 
              width: "250px" 
            }}>
              <img src={property.image?.startsWith("http") ? property.image : `https://tenantsync-backend.onrender.com${property.image}`} alt={property.houseName} style={{ width: "100%", borderRadius: "4px" }} />
              <h3 style={{ margin: "10px 0" }}>{property.houseName}</h3>
              <p>{property.address}</p>
              <p>
                Rooms: {property.rooms} | Kitchens: {property.kitchens} <br />
                Bedrooms: {property.bedrooms} | Washrooms: {property.washrooms}
              </p>
              <p>Sq Ft: {property.squareFeet}</p>
              <p>Rent Days: {property.rentDays}</p>
              <p style={{ fontWeight: "bold" }}>Price: tk.{property.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
