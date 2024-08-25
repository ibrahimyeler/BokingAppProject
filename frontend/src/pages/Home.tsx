import React, { useState, useEffect } from 'react';
import './Home.css';

const images = [
    '/images/abroadTours.jpeg',
    '/images/culturalTour.jpeg',
    '/images/flight.webp',
    '/images/hotel-booking.jpg'
];

const Home: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Resimler arasında 3 saniye geçiş yapar

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-container" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
            <div className="hero-overlay">
                <h1 className="text-5xl font-bold text-center text-white">Welcome to Unexpected Journey</h1>
                <p className="text-center text-white mt-4">Explore our services and plan your next adventure!</p>
            </div>
        </div>
    );
}

export default Home;
