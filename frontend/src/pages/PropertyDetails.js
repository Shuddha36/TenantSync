import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

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
      <p><strong>Address:</strong> {property.address}</p>
      <p><strong>Rooms:</strong> {property.rooms}</p>
      <p><strong>Kitchens:</strong> {property.kitchens}</p>
      <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
      <p><strong>Washrooms:</strong> {property.washrooms}</p>
      <p><strong>Square Feet:</strong> {property.squareFeet} sq. ft.</p>
      <p><strong>Rent Days:</strong> {property.rentDays} days</p>
      <p><strong>Price:</strong> ${property.price}</p>
      <p><strong>Description:</strong> {property.description}</p>
    </div>
  );
};

export default PropertyDetails;
