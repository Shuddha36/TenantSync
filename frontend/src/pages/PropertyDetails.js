// src/pages/PropertyDetails.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const PropertyDetails = ({ user }) => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [userId, setUserId] = useState(null);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/properties/${id}`);
      setProperty(res.data.property);
    } catch (err) {
      console.error("Error fetching property:", err);
    }
  };

  const fetchComments = async () => {
    const res = await fetch(`http://localhost:4000/api/comments/${id}`, {
      credentials: "include",
    });
    const data = await res.json();
    setComments(data);
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
      const response = await axios.get(
        "http://localhost:4000/api/auth/session",
        {
          withCredentials: true,
        }
      );
      if (response.data.loggedIn) {
        setUserId(response.data.user.id);
      }
    } catch (error) {
      console.error("Failed to fetch user session:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    const res = await fetch(`http://localhost:4000/api/comments/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content: newComment }),
    });
    if (res.ok) {
      setNewComment("");
      fetchComments();
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (!newComment.trim()) return;
    const res = await fetch(
      `http://localhost:4000/api/comments/${commentId}/reply`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: newComment }),
      }
    );
    if (res.ok) {
      setNewComment("");
      setReplyingTo(null);
      fetchComments();
    }
  };

  const handleLikeDislike = async (commentId, type) => {
    await fetch(`http://localhost:4000/api/comments/${commentId}/${type}`, {
      method: "POST",
      credentials: "include",
    });
    fetchComments();
  };

  const handleEditSubmit = async (commentId) => {
    await fetch(`http://localhost:4000/api/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content: editedContent }),
    });
    setEditingCommentId(null);
    setEditedContent("");
    fetchComments();
  };

  const handleDelete = async (commentId) => {
    await fetch(`http://localhost:4000/api/comments/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchComments();
  };

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
      setNewReview({ rating: 0, comment: "" });
      fetchReviews();
    } catch (error) {
      console.error("Failed to add review:", error);
      alert("Failed to add review. Please try again.");
    }
  };

  const handleRentNow = async () => {
    try {
      const userId = user.id;
      const res = await fetch("http://localhost:4000/api/rental-requests/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property: id,
          tenant: userId,
        }),
      });

      if (res.ok) {
        alert("Rental request submitted successfully!");
      } else {
        alert("Failed to submit rental request.");
      }
    } catch (err) {
      console.error("Error submitting rental request:", err);
      alert("An error occurred while submitting the rental request.");
    }
  };

  useEffect(() => {
    fetchProperty();
    fetchComments();
    fetchReviews();
    fetchUserId();
  }, [id]);

  if (!property) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{property.houseName}</h1>
      <img
        src={`http://localhost:4000${property.image}`}
        alt={property.houseName}
        className="w-full rounded mb-4"
      />
      <p>
        <strong>Address:</strong> {property.address}
      </p>
      <p>
        <strong>Rent:</strong> {property.rent}৳
      </p>
      <p>
        <strong>Description:</strong> {property.description}
      </p>

      <Link
        to={`/report/${property._id}`}
        className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-6"
      >
        Submit Report
      </Link>

      <hr className="my-6" />

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">FAQ Section</h2>
        <textarea
          className="w-full border rounded p-2 mb-2"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={
            replyingTo ? "Answering a question..." : "Add a Question here..."
          }
        ></textarea>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={
            replyingTo
              ? () => handleReplySubmit(replyingTo)
              : handleCommentSubmit
          }
        >
          {replyingTo ? "Reply" : "Post"}
        </button>
        <button
          className="ml-2 text-sm text-gray-500"
          onClick={() => {
            setReplyingTo(null);
            setNewComment("");
          }}
        >
          Cancel
        </button>
        {comments.map((c) => (
          <div key={c._id} className="mt-4 border p-3 rounded">
            <div className="text-sm text-gray-600 mb-1">
              {c.author?.username || "Unknown"} •{" "}
              {moment(c.createdAt).fromNow()}
            </div>
            {editingCommentId === c._id ? (
              <>
                <textarea
                  className="w-full border rounded p-2 mb-1"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white px-2 py-1 mr-2 rounded text-sm"
                  onClick={() => handleEditSubmit(c._id)}
                >
                  Save
                </button>
                <button
                  className="text-sm text-gray-600"
                  onClick={() => {
                    setEditingCommentId(null);
                    setEditedContent("");
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <p className="mb-1">{c.content}</p>
            )}
            <div className="flex gap-4 text-xs text-blue-600">
              <span
                className="cursor-pointer"
                onClick={() => handleLikeDislike(c._id, "like")}
              >
                👍 {c.likes.length}
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleLikeDislike(c._id, "dislike")}
              >
                👎 {c.dislikes.length}
              </span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  setReplyingTo(c._id);
                  setNewComment("");
                }}
              >
                Reply
              </span>
              <span
                className="cursor-pointer text-yellow-700"
                onClick={() => {
                  setEditingCommentId(c._id);
                  setEditedContent(c.content);
                }}
              >
                Edit
              </span>
              <span
                className="cursor-pointer text-red-500"
                onClick={() => handleDelete(c._id)}
              >
                Delete
              </span>
            </div>
            {c.replies?.map((r) => (
              <div
                key={r._id}
                className="ml-6 mt-2 text-sm border-l-2 pl-3 italic"
              >
                <strong>{r.author?.username}:</strong> {r.content}{" "}
                <span className="text-xs text-gray-500">
                  {moment(r.createdAt).fromNow()}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Review Section */}
      {userId && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Add Review</h3>
          <div>
            <label>Rating: </label>
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
              className="p-2 border rounded"
            >
              <option value="0">Select rating</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Comment: </label>
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
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
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border p-4 mb-4 rounded-lg">
              <p>
                <strong>{review.userId.name}</strong> ({review.rating} Stars)
              </p>
              <p>{review.comment}</p>
              <p className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>

      <button
        onClick={handleRentNow}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Rent Now
      </button>
    </div>
  );
};

export default PropertyDetails;
