import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tour } from '../types/tour/Tour';
import { Link } from 'react-router-dom'; // React Router'ı içe aktar

const AbroadTours: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get<Tour[]>('/api/abroadtours');
        setTours(response.data);
        setFilteredTours(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('Unexpected error occurred');
        }
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredTours(
        tours.filter(tour =>
          tour.destination.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredTours(tours);
    }
  }, [searchQuery, tours]);

  if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-lg font-semibold text-white">Loading tours...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-red-600">{error}</p></div>;

  return (
    <div className="p-6 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <Link to="/" className="text-white text-lg font-semibold bg-gray-800 p-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">
          Home Page
        </Link>
        <input
          type="text"
          placeholder="Search tours..."
          className="p-2 rounded-lg shadow-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">Our Exciting Abroad Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTours.map(tour => (
          <div key={tour._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2">
            <img src={tour.imageUrl} alt={tour.destination} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{tour.destination}</h2>
            <p className="text-gray-700"><strong>Duration:</strong> {tour.duration} days</p>
            <p className="text-gray-700"><strong>Price:</strong> ${tour.price}</p>
            <p className="text-gray-700"><strong>Category:</strong> {tour.category}</p>
            <p className="text-gray-700 mt-4">{tour.description}</p>
            <Link to={`/tours/${tour._id}`} className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300">
              Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbroadTours;
