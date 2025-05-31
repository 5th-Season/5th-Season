import React from "react";
import { Link } from "react-router-dom";

export default function OnboardingLayout({ children, title, backUrl }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <rect width="10" height="10" x="2" y="2" fill="#4F46E5" rx="2" />
              <rect width="10" height="10" x="12" y="2" fill="#8B5CF6" rx="2" />
              <rect width="10" height="10" x="2" y="12" fill="#EC4899" rx="2" />
              <rect width="10" height="10" x="12" y="12" fill="#F59E0B" rx="2" />
            </svg>
          </div>
          <button className="text-gray-500 border border-gray-300 rounded-full px-4 py-1 text-sm hover:text-gray-700 hover:border-gray-400 transition-colors">
            Help
          </button>
        </div>
        
        <div className="p-6">
          {backUrl && (
            <Link 
              to={backUrl}
              className="inline-flex items-center text-gray-700 mb-6"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </Link>
          )}
          
          <h1 className="text-2xl font-semibold mb-8">{title}</h1>
          
          {children}
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
