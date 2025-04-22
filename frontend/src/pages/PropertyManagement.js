// src/pages/PropertyManagement.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PropertyManagement() {
  const [activeTab, setActiveTab] = useState("create");
  const navigate = useNavigate();
  const { propertyId } = useParams(); // Property ID from the URL
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Fetch reviews for the property
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/reviews/${propertyId}`);
        setReviews(res.data.reviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, [propertyId]);

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

  // Handle review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/reviews/add",
        { propertyId, rating, comment },
        { withCredentials: true } // Ensure session cookie is sent for authentication
      );
      alert("Review submitted!");
      setRating(0);
      setComment("");
    } catch (err) {
      alert("Error submitting review: " + err.response.data.error);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      {/* Left Sidebar */}
      <div style={{ width: "200px", backgroundColor: "#333", color: "#fff", padding: "20px" }}>
        <div style={{ marginBottom: "20px", cursor: "pointer" }} onClick={() => setActiveTab("create")}>
          Create Advertisement
        </div>
        <div style={{ marginBottom: "20px", cursor: "pointer" }} onClick={() => setActiveTab("approval")}>
          Flat Approval
        </div>
        <div style={{ marginBottom: "20px", cursor: "pointer" }} onClick={() => navigate("/profile")}>
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
            {/* Include your advertisement-related components here */}
          </>
        )}
        {activeTab === "approval" && (
          <div>
            {/* Add approval-related content here */}
          </div>
        )}

        {/* Property Reviews Section */}
        <div className="review-section">
          <h3>Reviews</h3>
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to leave a review!</p>
          ) : (
            <ul>
              {reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.tenant.username}</strong> ({review.rating} stars)
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          )}

          {/* Review Form */}
          <h4>Leave a Review</h4>
          <form onSubmit={handleReviewSubmit}>
            <div>
              <label>Rating</label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div>
              <label>Comment</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
}