import React, { useState, useEffect } from 'react';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation';
import { verifyToken } from '../../utils';

export function loader() {
  try {
    const user = verifyToken(); // Check if the token is valid and return the user information
    return { user }; // Return the user data to the component
  } catch (err) {
    console.error('Authentication error:', err.message);
    return redirect('/login'); // Redirect to the login page if no valid token is found
  }
}

const Home = () => {
  const data = useLoaderData();
  const navigate = useNavigate(); // Hook to handle navigation
  const [isBreathing, setIsBreathing] = useState(false);
  const [breatheIn, setBreatheIn] = useState(true);

  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreatheIn((prev) => !prev);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  const affirmations = [
    { title: 'Strength is in silence ', image: 'https://img.freepik.com/premium-vector/cartoon-buddha-cute-baby-illustration_961875-480902.jpg' },
    { title: 'Healing takes time', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlIfw3cJTYoJ-jFqE4UGaiSojbiZ2jtBgoXw&s' },
    { title: 'You are not alone', image: 'https://sites.psu.edu/pavlechkopb/files/2019/10/helping-hand.jpg' },
    { title: 'Let go off fear', image: 'https://media.istockphoto.com/id/1126007754/photo/visionary-man-standing-on-top-of-cliff-edge-staring-at-colorful-sunset-by-the-sea-in-gran.jpg?s=612x612&w=0&k=20&c=SlskUhSogIfzYfB5KGa5o3gWUO4Ndrq02ybGHcQxL-k=' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 p-0">
      {/* Header Section */}
      <div className="relative h-48">
        <img
          src="header2.jpg"
          alt="Mountain lake purple"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/30 p-6 flex justify-between items-start">
          <h1 className="text-4xl font-bold text-white">Hi,<br /><b>{data.user.given_name}</b></h1>
          <div
            className="w-24 h-24 bg-white rounded-full cursor-pointer"
            onClick={() => navigate('/profile')} // Navigate to the profile page on click
          >
            <img
              src={data.user.picture}
              alt={data.user.given_name}
              className="object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Affirmations Section */}
      <div className="px-4 py-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Affirmations</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {affirmations.map((item, index) => (
            <div key={index} className="flex-none w-48 bg-indigo-800 rounded-lg overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
              <div className="p-3">
                <p className="text-sm text-white">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Breathe-in Section */}
      <div className="px-4 py-6">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Deep Breathing</h2>
        <div className="flex flex-col items-center space-y-6">
          <div
            className={`w-56 h-56 rounded-full bg-blue-200 flex items-center justify-center relative transition-transform duration-[8000ms] ease-in-out ${isBreathing ? (breatheIn ? 'scale-125' : 'scale-100') : ''
              }`}
          >
            <div
              className={`absolute w-40 h-40 rounded-full bg-blue-300 flex items-center justify-center transition-transform duration-[8000ms] ease-in-out ${isBreathing ? (breatheIn ? 'scale-125' : 'scale-100') : ''
                }`}
            >
              <div
                className={`absolute w-28 h-28 rounded-full bg-white flex items-center justify-center transition-transform duration-[8000ms] ease-in-out ${isBreathing ? (breatheIn ? 'scale-125' : 'scale-100') : ''
                  }`}
              >
                <span className="text-blue-700 text-lg font-semibold">
                  {breatheIn ? 'Inhale' : 'Exhale'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all"
              onClick={() => setIsBreathing(true)}
            >
              Start
            </button>
            <button
              className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all"
              onClick={() => setIsBreathing(false)}
            >
              Stop
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Home;
