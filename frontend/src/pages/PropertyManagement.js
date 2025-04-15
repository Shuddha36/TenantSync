// src/pages/PropertyManagement.js
import React, { useState } from "react";
import CreateAdvertisement from "../components/CreateAdvertisement";
import FlatApproval from "../components/FlatApproval";
import AdvertisementList from "../components/AdvertisementList";

export default function PropertyManagement() {
  const [activeTab, setActiveTab] = useState("create");
  
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      {/* Left Sidebar */}
      <div style={{
        width: "200px",
        backgroundColor: "#333",
        color: "#fff",
        padding: "20px"
      }}>
        <div style={{ marginBottom: "20px", cursor: "pointer" }} onClick={() => setActiveTab("create")}>
          Create Advertisement
        </div>
        <div style={{ marginBottom: "20px", cursor: "pointer" }} onClick={() => setActiveTab("approval")}>
          Flat Approval
        </div>
        {/* Add more options here in future */}
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
