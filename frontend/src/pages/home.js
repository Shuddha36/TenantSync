// src/pages/Home.js
import React, { useEffect, useState } from "react";
import PropertyCard from "../components/propertycard";
import SearchBar from "../components/searchbar";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roomFilter, setRoomFilter] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/properties/all");
        const data = await res.json();
        setProperties(data.properties || []);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((prop) => {
    const matchesAddress = prop.address
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRoom = roomFilter ? prop.rooms === Number(roomFilter) : true;
    return matchesAddress && matchesRoom;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center font-bold mb-4">
        Welcome to TenantSync 🏠
      </h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roomFilter={roomFilter}
        setRoomFilter={setRoomFilter}
      />
      <div className="flex flex-wrap justify-center">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-8">
            No matching flats found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
