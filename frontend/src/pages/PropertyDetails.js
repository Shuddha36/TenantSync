// src/pages/PropertyDetails.js
// src/pages/PropertyDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PropertyDetails = () => {
  const { id } = useParams(); // Property ID from the URL
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/properties/${id}`);
        setProperty(res.data.property);
      } catch (err) {
        console.error("Error fetching property:", err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/reviews/${id}`);
        setReviews(res.data.reviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/auth/session", {
          withCredentials: true,
        });
        if (response.data.loggedIn) {
          setUserId(response.data.user.id);
        }
      } catch (error) {
        console.error("Failed to fetch user session:", error);
      }
    };

    fetchProperty();
    fetchReviews();
    fetchUserId();
  }, [id]);

  const handleAddReview = async () => {
    if (!userId) {
      alert("You must be logged in to add a review.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/reviews", {
        propertyId: id,
        userId,
        rating: newReview.rating,
        comment: newReview.comment,
      });
      alert(response.data.message);
      setNewReview({ rating: 0, comment: "" }); // Clear form after submitting
      fetchReviews(); // Refresh reviews
    } catch (error) {
      console.error("Failed to add review:", error);
      alert("Failed to add review. Please try again.");
    }
  };

  if (!property) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{property.houseName}</h1>
      <img
        src={`http://localhost:4000${property.image}`}
        alt={property.houseName}
        className="w-full rounded mb-4"
      />
      <p><strong>Address:</strong> {property.address}</p>
      <p><strong>Rooms:</strong> {property.rooms}</p>
      <p><strong>Kitchens:</strong> {property.kitchens}</p>
      <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
      <p><strong>Washrooms:</strong> {property.washrooms}</p>
      <p><strong>Square Feet:</strong> {property.squareFeet} sq. ft.</p>
      <p><strong>Rent Days:</strong> {property.rentDays} days</p>
      <p><strong>Price:</strong> ${property.price}</p>
      <p><strong>Description:</strong> {property.description}</p>

      {/* Review Form */}
      {userId && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Add Review</h3>
          <div>
            <label>Rating: </label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="0">Select rating</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Comment: </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="p-2 border rounded w-full mt-2"
            ></textarea>
          </div>
          <button
            onClick={handleAddReview}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Submit Review
          </button>
        </div>
      )}

      {/* Display Reviews */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border p-4 mb-4 rounded-lg">
              <p><strong>{review.userId.name}</strong> ({review.rating} Stars)</p>
              <p>{review.comment}</p>
              <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;