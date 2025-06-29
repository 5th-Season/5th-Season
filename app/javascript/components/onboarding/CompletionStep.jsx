import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function CompletionStep() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get designer data from navigation state
  const designer = location.state?.designer;
  
  useEffect(() => {
    if (!designer) {
      setError("Designer information not found");
      return;
    }
    
    // Automatically redirect to the profile after a short delay
    setTimeout(() => {
      navigate(`/${designer.username}`);
    }, 2000);
  }, [designer, navigate]);
  
  if (!designer) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">Designer information not found. Please try again.</p>
          <Link 
            to="/"
            className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 inline-block"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            to="/"
            className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 inline-block"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-green-600" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          
          <h1 className="text-2xl font-semibold mb-4">Congratulations!</h1>
          
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Your designer profile has been created successfully. You're now ready to showcase your 
            designs and collaborate with others in the 5th Season community.
            <br /><br />
            <span className="text-indigo-600 font-medium">You'll be automatically redirected to your profile in a moment...</span>
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <div className="mb-4">
              <h2 className="font-semibold text-lg">@{designer.username}</h2>
              <p className="text-gray-500 text-sm">Your profile is ready!</p>
            </div>
            <p className="text-gray-700">Your designer profile has been successfully created and is now live.</p>
          </div>
          
          <Link 
            to={`/${designer.username}`}
            className="px-6 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 inline-block font-medium"
          >
            View Your Profile
          </Link>
        </div>
        
        <div className="border-t p-5 flex justify-between text-sm text-gray-500">
          <div>&copy; {new Date().getFullYear()} 5th Season</div>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-gray-700">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-gray-700">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
