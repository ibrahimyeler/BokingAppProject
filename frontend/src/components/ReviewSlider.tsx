import React from 'react';
import './ReviewsSlider.css';

const reviews = [
    { text: "Amazing experience! Highly recommend.", rating: 5 },
    { text: "The trip was well organized and fun.", rating: 4 },
    { text: "Great service and support throughout the journey.", rating: 4 },
    { text: "Enjoyed every bit of it, will definitely book again.", rating: 5 }
];

const ReviewsSlider: React.FC = () => {
    return (
        <div className="reviews-slider-container">
            <div className="reviews-slider">
                {reviews.concat(reviews).map((review, index) => (
                    <div key={index} className="review-item">
                        <p>{review.text}</p>
                        <div className="rating">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsSlider;
