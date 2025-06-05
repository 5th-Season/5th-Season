import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

const productTypes = [
  { id: "apparel", icon: "👕", label: "Apparel", sublabel: "Menswear / Womenswear / Genderless" },
  { id: "streetwear", icon: "🧢", label: "Streetwear", sublabel: "Urban & casual styles" },
  { id: "couture", icon: "✨", label: "Couture / Eveningwear", sublabel: "High-end & formal wear" },
  { id: "accessories", icon: "👜", label: "Accessories", sublabel: "Hats, Bags, Belts" },
  { id: "jewelry", icon: "💎", label: "Jewelry", sublabel: "Fine & fashion jewelry" },
  { id: "footwear", icon: "👠", label: "Footwear", sublabel: "Shoes & boots" },
  { id: "intimates", icon: "🩱", label: "Intimates / Loungewear", sublabel: "Underwear & comfort wear" },
  { id: "bridal", icon: "👰", label: "Bridal / Occasionwear", sublabel: "Wedding & special events" },
  { id: "kidswear", icon: "👶", label: "Kidswear", sublabel: "Children's clothing" }
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
        navigate("/onboarding/production-style");
      } else {
        console.error("Failed to save product type");
      }
    } catch (error) {
      console.error("Error saving product type:", error);
    }
  };
  
  return (
    <OnboardingLayout
      backUrl="/onboarding/username"
      title="What best describes your brand or creative focus?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productTypes.map((type) => (
          <div
            key={type.id}
            className={`flex flex-col border rounded-lg p-4 cursor-pointer transition-all ${
              selectedType === type.id
                ? "border-purple-500 bg-purple-50 shadow-sm"
                : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
            }`}
            onClick={() => setSelectedType(type.id)}
          >
            <div className="flex items-center mb-2">
              <div className="text-2xl mr-3">{type.icon}</div>
              <div className="text-sm font-medium">{type.label}</div>
            </div>
            <div className="text-xs text-gray-600">{type.sublabel}</div>
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
