// src/components/PropertyCard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const PropertyCard = ({ property }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
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

    fetchUserId();
  }, []);

  const handleAddToWishlist = async () => {
    if (!userId) {
      alert("You must be logged in to add to wishlist.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/wishlist", {
        userId,
        propertyId: property._id,
      });
      alert(response.data.message || "Added to wishlist!");
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      alert("Failed to add to wishlist. Please try again.");
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-md max-w-md mx-auto relative">
      <img
        src={`http://localhost:4000${property.image}`}
        alt="Flat"
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{property.houseName}</h2>
      <p className="text-gray-600">{property.address}</p>
      <p>Rooms: {property.rooms}</p>
      <p className="font-semibold text-green-600">Price: ${property.price}</p>
      <button
        onClick={handleAddToWishlist}
        className="absolute top-2 right-2 bg-transparent border-none cursor-pointer"
      >
        <img src="/heart.png" alt="Add to Wishlist" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default PropertyCard;
