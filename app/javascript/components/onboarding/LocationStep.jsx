import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

export default function LocationStep() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleNextClick = async (e) => {
    e.preventDefault();
    
    if (!location) {
      setError("Please provide your location");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/onboarding/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ location })
      });
      
      if (response.ok) {
        navigate("/onboarding/collaboration");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to save location");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error saving location:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <OnboardingLayout
      backUrl="/onboarding/brand-info"
      title="Where are you based?"
    >
      {error && (
        <div className="mb-6 bg-red-50 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleNextClick}>
        <div className="mb-6">
          <label htmlFor="location" className="block mb-2 font-medium text-gray-700">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
            placeholder="City, Country"
            required
          />
          <p className="mt-2 text-gray-500 text-sm">
            This helps us connect you with local manufacturing opportunities and showcase your regional design influence.
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-2 rounded-full font-medium text-white ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {isLoading ? "Saving..." : "Next"}
        </button>
      </form>
    </OnboardingLayout>
  );
}
