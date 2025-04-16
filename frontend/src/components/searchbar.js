import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, roomFilter, setRoomFilter }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 justify-center items-center">
      <input
        type="text"
        placeholder="Search by address"
        className="p-2 border rounded-md w-64"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="p-2 border rounded-md"
        value={roomFilter}
        onChange={(e) => setRoomFilter(e.target.value)}
      >
        <option value="">All Rooms</option>
        <option value="1">1 Room</option>
        <option value="2">2 Rooms</option>
        <option value="3">3 Rooms</option>
        <option value="4">4 Rooms</option>
      </select>
    </div>
  );
};

export default SearchBar;