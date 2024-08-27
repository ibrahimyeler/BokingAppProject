// src/FlightsPage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FlightSearchForm from './FlightSearchForm'; // Yeni bileşeni içe aktar
import './FlightsPage.css'; // CSS dosyanızın yolu doğru

const FlightPage: React.FC = () => {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [animatePlane, setAnimatePlane] = useState(false);

  const handleSearchClick = () => {
    setShowSearchForm(true);
  };

  useEffect(() => {
    // Uçak animasyonunu başlatmak için 1 saniye sonra 'animate' sınıfı eklenir.
    const timer = setTimeout(() => {
      setAnimatePlane(true);
    }, 1000);

    return () => clearTimeout(timer); // Bileşen unmount olduğunda timeout temizlenir.
  }, []);

  return (
    <div className="flights-container">
      <div className={`plane-animation ${animatePlane ? 'animate' : ''}`} />
      <div className="back-button-container">
        <Link to="/" className="back-to-home">Back to Home Page</Link>
      </div>
      <main className="content">
        <div className="header-container">
          <h1 className="animated-header">Welcome to the Flights Page</h1>
        </div>
        <div className="search-container">
          {showSearchForm ? (
            <FlightSearchForm />
          ) : (
            <button onClick={handleSearchClick} className="search-button">
              Search Flights
            </button>
          )}
        </div>
        <p>Explore our flight options and book your next adventure!</p>
      </main>
    </div>
  );
}

export default FlightPage;
