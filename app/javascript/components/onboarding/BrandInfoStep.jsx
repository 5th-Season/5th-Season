import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

export default function BrandInfoStep() {
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleNextClick = async (e) => {
    e.preventDefault();
    
    if (!brandName || !brandDescription) {
      setError("Please provide both brand name and description");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/onboarding/brand_info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ 
          brand_name: brandName, 
          brand_description: brandDescription 
        })
      });
      
      if (response.ok) {
        navigate("/onboarding/location");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to save brand information");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error saving brand info:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <OnboardingLayout
      backUrl="/onboarding/personal-info"
      title="Tell us about your brand"
    >
      {error && (
        <div className="mb-6 bg-red-50 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleNextClick}>
        <div className="mb-6">
          <label htmlFor="brandName" className="block mb-2 font-medium text-gray-700">
            Brand Name
          </label>
          <input
            id="brandName"
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
            placeholder="Your brand name"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="brandDescription" className="block mb-2 font-medium text-gray-700">
            Brand Description
          </label>
          <textarea
            id="brandDescription"
            value={brandDescription}
            onChange={(e) => setBrandDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
            placeholder="Tell us about your brand, design philosophy, and style"
            rows="4"
            required
          />
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
