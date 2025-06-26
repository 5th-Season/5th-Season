import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

export default function BrandInfoStep() {
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const navigate = useNavigate();
  
  const handleNextClick = async () => {
    if (!brandName.trim() || !brandDescription.trim()) return;
    
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
        console.error("Failed to save brand info");
      }
    } catch (error) {
      console.error("Error saving brand info:", error);
    }
  };
  
  return (
    <OnboardingLayout
      backUrl="/onboarding/brand-attributes"
      title="Tell us about your brand"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand Name
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your brand name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand Description
          </label>
          <textarea
            value={brandDescription}
            onChange={(e) => setBrandDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Describe your brand's vision, style, or mission..."
          />
        </div>
      </div>
      
      <button
        onClick={handleNextClick}
        disabled={!brandName.trim() || !brandDescription.trim()}
        className={`mt-8 px-6 py-2 rounded-full font-medium text-white ${
          brandName.trim() && brandDescription.trim()
            ? "bg-indigo-500 hover:bg-indigo-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </OnboardingLayout>
  );
}
