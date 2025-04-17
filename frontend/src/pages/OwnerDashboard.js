// src/pages/OwnerDashboard.js
import React from "react";
import PropertyManagement from "./PropertyManagement";

export default function OwnerDashboard() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      <header style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "20px",
        textAlign: "center"
      }}>
        <h1>Owner Dashboard</h1>
      </header>
      <main style={{ padding: "20px" }}>
        {/* Embed the Property Management page */}
        <PropertyManagement />
      </main>
    </div>
  );
}
