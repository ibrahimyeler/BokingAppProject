import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './header.css';

const Header: React.FC = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    const [userFullName, setUserFullName] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isAuthPage = location.pathname === '/signin' || location.pathname === '/register';

    useEffect(() => {
        const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (userLoggedIn) {
            const firstName = localStorage.getItem('firstName') || '';
            const lastName = localStorage.getItem('lastName') || '';
            setUserFullName(`${firstName} ${lastName}`);
        }
        setIsUserLoggedIn(userLoggedIn);
    }, [location]);

    const handleSignOut = () => {
        localStorage.setItem('isLoggedIn', 'false');
        setIsUserLoggedIn(false);
        setUserFullName('');
        navigate('/signin');
    };

    const text = "UnexpectedJourney.com";

    return (
        <header className="header-background bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700 py-6 shadow-md relative">
            <div className="container mx-auto flex items-center justify-between px-4">
                <div className="flex items-center space-x-2">
                    <button
                        className="text-white text-xl relative transition-transform duration-300 transform hover:scale-110"
                        onClick={() => setIsMenuOpen(prev => !prev)}
                    >
                        <FaBars />
                    </button>
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="title-text-wrapper">
                        <h1 className="title-text">
                            <Link to="/" className="title-link">
                                {text.split("").map((char, index) => (
                                    <span key={index} className="title-char">
                                        {char}
                                    </span>
                                ))}
                            </Link>
                        </h1>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {!isAuthPage && (
                        <>
                            {isUserLoggedIn ? (
                                <>
                                    <span className="text-white font-semibold">
                                        Welcome to UnexpectedJourney.com {userFullName}
                                    </span>
                                    <button
                                        className="text-white border-2 border-white px-4 py-2 text-sm font-semibold rounded-lg bg-transparent hover:bg-red-500 hover:text-black transition-colors duration-300"
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="text-white border-2 border-white px-4 py-2 text-sm font-semibold rounded-lg bg-transparent hover:bg-yellow-400 hover:text-black transition-colors duration-300"
                                        onClick={() => navigate('/signin')}
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        className="text-white border-2 border-white px-4 py-2 text-sm font-semibold rounded-lg bg-transparent hover:bg-yellow-400 hover:text-black transition-colors duration-300"
                                        onClick={() => navigate('/register')}
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </>
                    )}
                    {isMenuOpen && (
                        <div className="absolute left-0 top-full mt-2 bg-white border border-gray-300 shadow-lg z-10">
                            <ul className="list-none p-4 space-y-2">
                                <li><Link to="/" className="block py-2 px-6 text-gray-700 hover:bg-blue-500 hover:text-white rounded transition-colors duration-300">Home</Link></li>
                                <li><Link to="/search/search-flight" className="block py-2 px-6 text-gray-700 hover:bg-blue-500 hover:text-white rounded transition-colors duration-300">Search Flights</Link></li>
                                <li><Link to="/search/search-hotel" className="block py-2 px-6 text-gray-700 hover:bg-blue-500 hover:text-white rounded transition-colors duration-300">Search Hotels</Link></li>
                                <li><Link to="/profile-page" className="block py-2 px-6 text-gray-700 hover:bg-blue-500 hover:text-white rounded transition-colors duration-300">Profile Page</Link></li>
                                <li><Link to="/privacy-policy" className="block py-2 px-6 text-gray-700 hover:bg-blue-500 hover:text-white rounded transition-colors duration-300">Privacy Policy</Link></li>
                                <li><Link to="/terms-of-service" className="block py-2 px-6 text-gray-700 hover:bg-blue-500 hover:text-white rounded transition-colors duration-300">Terms of Service</Link></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
