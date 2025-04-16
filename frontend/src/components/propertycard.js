// src/components/PropertyCard.js
import React from "react";

const PropertyCard = ({ property }) => {
  return (
    <div className="border rounded-xl p-4 shadow-md max-w-md mx-auto">
      <img
        src={`http://localhost:4000${property.image}`}
        alt="Flat"
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{property.houseName}</h2>
      <p className="text-gray-600">{property.address}</p>
      <p>Rooms: {property.rooms}</p>
      <p className="font-semibold text-green-600">Price: ${property.price}</p>
    </div>
  );
};

export default PropertyCard;