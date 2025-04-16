// src/components/CreateAdvertisement.js
import React, { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function CreateAdvertisement() {
  const [form, setForm] = useState({
    houseName: "",
    address: "",
    rooms: "",
    kitchens: "",
    bedrooms: "",
    washrooms: "",
    squareFeet: "",
    rentDays: "",
    price: "", // NEW: Price of the flat
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("houseName", form.houseName);
    formData.append("address", form.address);
    formData.append("rooms", form.rooms);
    formData.append("kitchens", form.kitchens);
    formData.append("bedrooms", form.bedrooms);
    formData.append("washrooms", form.washrooms);
    formData.append("squareFeet", form.squareFeet);
    formData.append("rentDays", form.rentDays);
    formData.append("price", form.price); // NEW: append price
    if (image) {
      formData.append("image", image);
    }
    try {
      await axios.post("http://localhost:4000/api/properties/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Advertisement created successfully!");
    } catch (err) {
      setMessage("Error creating advertisement.");
    }
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "auto",
      backgroundColor: "#fff",
      padding: "20px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      borderRadius: "8px"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Advertisement</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
        {/* House Name */}
        <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "4px" }}>House Name:</label>
          <input name="houseName" value={form.houseName} onChange={handleChange} required style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        </div>

        {/* Address */}
        <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "4px" }}>Address:</label>
          <input name="address" value={form.address} onChange={handleChange} required style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        </div>

        {/* Rooms */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "4px" }}>Rooms:</label>
          <input name="rooms" type="number" value={form.rooms} onChange={handleChange} required style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        </div>

        {/* Kitchens */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "4px" }}>Kitchens:</label>
          <input name="kitchens" type="number" value={form.kitchens} onChange={handleChange} required style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        </div>

        {/* Bedrooms */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "4px" }}>Bedrooms:</label>
          <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} required style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        </div>

        {/* Washrooms */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "4px" }}>Washrooms:</label>
          <input name="washrooms" type="number" value={form.washrooms} onChange={handleChange} required style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        </div>

        {/* Square Feet */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "4px" }}>Square Feet:</label>
          <input name="squareFeet" type="number" value={form.squareFeet} onChange={handleChange} required style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        </div>

        {/* Rent Days */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "4px" }}>Rent Days:</label>
          <input name="rentDays" type="number" value={form.rentDays} onChange={handleChange} required style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        </div>

        {/* Price (New Field) */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "4px" }}>Price:</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} required style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        </div>

        {/* House Image */}
        <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "4px" }}>House Image:</label>
          <input name="image" type="file" accept="image/*" onChange={handleImageChange} required style={{ padding: "8px 0" }} />
        </div>

        {/* Submit Button */}
        <div style={{ gridColumn: "span 2", textAlign: "center", marginTop: "10px" }}>
          <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "20px", cursor: "pointer", fontSize: "16px" }}>
            Save
          </button>
        </div>
      </form>
      {message && <p style={{ marginTop: "20px", textAlign: "center", fontWeight: "bold" }}>{message}</p>}
    </div>
  );
}
