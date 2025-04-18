// src/pages/PropertyManagement.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAdvertisement from "../components/CreateAdvertisement";
import FlatApproval from "../components/FlatApproval";
import AdvertisementList from "../components/AdvertisementList";

export default function PropertyManagement() {
  const [activeTab, setActiveTab] = useState("create");
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

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: "200px",
          backgroundColor: "#333",
          color: "#fff",
          padding: "20px",
        }}
      >
        <div
          style={{ marginBottom: "20px", cursor: "pointer" }}
          onClick={() => setActiveTab("create")}
        >
          Create Advertisement
        </div>
        <div
          style={{ marginBottom: "20px", cursor: "pointer" }}
          onClick={() => setActiveTab("approval")}
        >
          Flat Approval
        </div>
        <div
          style={{ marginBottom: "20px", cursor: "pointer" }}
          onClick={() => navigate("/profile")}
        >
          Personal Information
        </div>
        <div
          style={{
            marginBottom: "20px",
            cursor: "pointer",
            color: "white",
            backgroundColor: "red",
            padding: "10px",
            borderRadius: "5px",
            textAlign: "center",
          }}
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {activeTab === "create" && (
          <>
            <CreateAdvertisement />
            <AdvertisementList />
          </>
        )}
        {activeTab === "approval" && <FlatApproval />}
      </div>
    </div>
  );
}
