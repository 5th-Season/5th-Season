import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

export default function LocationStep() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  
  const handleNextClick = async () => {
    if (!location.trim()) return;
    
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
        console.error("Failed to save location");
      }
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };
  
  return (
    <OnboardingLayout
      backUrl="/onboarding/brand-info"
      title="Where are you based?"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="e.g., New York, NY, USA"
        />
        <p className="mt-2 text-sm text-gray-500">
          This helps people find local designers and understand shipping logistics
        </p>
      </div>
      
      <button
        onClick={handleNextClick}
        disabled={!location.trim()}
        className={`mt-8 px-6 py-2 rounded-full font-medium text-white ${
          location.trim()
            ? "bg-indigo-500 hover:bg-indigo-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </OnboardingLayout>
  );
}
