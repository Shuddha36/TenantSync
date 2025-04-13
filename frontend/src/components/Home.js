// src/components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [flats, setFlats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/flats')
      .then(response => {
        // Only show first 3 flats
        const limitedFlats = response.data.slice(0, 3);
        setFlats(limitedFlats);
      })
      .catch(error => {
        console.error('Error fetching flats:', error);
      });
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
  <button className="home-button outline login-button">Login / Register</button>
</div>

<h1 className="home-title">Tenant Sync</h1>
      <div className="home-buttons-container">
        {/* Left Side */}
        <div className="home-buttons-left">
          <button className="home-button blue">Search</button>
          <button className="home-button green">Book Now</button>

          {/* Flat description text */}
          <div className="home-description">
            <p>🏠 Total Flats Available: 3</p>
            <p>Explore the best flats in your city at affordable prices!</p>
          </div>
        </div>
      </div>

      {/* Flats Display */}
      <div className="home-flats-grid">
        {flats.map(flat => (
          <div key={flat._id} className="flat-card">
            <img src={flat.image} alt={flat.title} className="flat-card-image" />
            <div className="flat-card-content">
              <div className="flat-info">
                <h2 className="flat-title">{flat.title}</h2>
                <p className="flat-location">{flat.location}</p>
              </div>
              <div className="flat-price-info">
                <span className="flat-rating">8.2</span>
                <div className="flat-price">
                  <p className="flat-price-amount">BDT {flat.price}</p>
                  <p className="flat-price-label">For tonight</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;