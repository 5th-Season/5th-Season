import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

const productTypes = [
  { id: "apparel", icon: "👕", label: "Apparel" },
  { id: "jewelry", icon: "💎", label: "Jewelry" },
  { id: "medical", icon: "💊", label: "Medical & Rx" },
  { id: "electronics", icon: "💻", label: "Electronics" },
  { id: "auto", icon: "🚗", label: "Auto" },
  { id: "baby", icon: "👶", label: "Baby Products" },
  { id: "games", icon: "🎮", label: "Games & Media" },
  { id: "sports", icon: "🏀", label: "Sports Outdoor" },
  { id: "pets", icon: "🐾", label: "Product for Pets" },
  { id: "arts", icon: "🎨", label: "Arts & Crafts" },
  { id: "beauty", icon: "💄", label: "Beauty & Skincare" },
  { id: "health", icon: "❤️", label: "Health & Wellness" },
  { id: "home", icon: "🏠", label: "Home & Garden" },
  { id: "toys", icon: "🧸", label: "Toys" },
  { id: "food", icon: "🍔", label: "Food & Grocery" },
  { id: "books", icon: "📚", label: "Books" }
];

export default function ProductTypeStep() {
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate();
  
  const handleNextClick = async () => {
    if (!selectedType) return;
    
    try {
      const response = await fetch("/api/onboarding/product_type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ product_type: selectedType })
      });
      
      if (response.ok) {
        navigate("/onboarding/personal-info");
      } else {
        console.error("Failed to save product type");
      }
    } catch (error) {
      console.error("Error saving product type:", error);
    }
  };
  
  return (
    <OnboardingLayout
      backUrl="/"
      title="What kind of products do you sell?"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {productTypes.map((type) => (
          <div
            key={type.id}
            className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer transition-all ${
              selectedType === type.id
                ? "border-purple-500 bg-purple-50 shadow-sm"
                : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
            }`}
            onClick={() => setSelectedType(type.id)}
          >
            <div className="text-2xl mb-2">{type.icon}</div>
            <div className="text-sm text-center">{type.label}</div>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleNextClick}
        disabled={!selectedType}
        className={`mt-8 px-6 py-2 rounded-full font-medium text-white ${
          selectedType
            ? "bg-indigo-500 hover:bg-indigo-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </OnboardingLayout>
  );
}
