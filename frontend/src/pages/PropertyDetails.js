import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PropertyDetails = ({ user }) => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  const handleRentNow = async () => {
    try {
      const userId = user.id; // Replace with actual user ID from session
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
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/properties/${id}`);
        const data = await res.json();
        setProperty(data.property);
      } catch (err) {
        console.error("Error fetching property:", err);
      }
    };

    fetchProperty();
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
        <strong>Rooms:</strong> {property.rooms}
      </p>
      <p>
        <strong>Kitchens:</strong> {property.kitchens}
      </p>
      <p>
        <strong>Bedrooms:</strong> {property.bedrooms}
      </p>
      <p>
        <strong>Washrooms:</strong> {property.washrooms}
      </p>
      <p>
        <strong>Square Feet:</strong> {property.squareFeet} sq. ft.
      </p>
      <p>
        <strong>Rent Days:</strong> {property.rentDays} days
      </p>
      <p>
        <strong>Price:</strong> ${property.price}
      </p>
      <p>
        <strong>Description:</strong> {property.description}
      </p>
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
