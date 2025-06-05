import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

const productionStyles = [
  { id: "sustainable", icon: "🌱", label: "Sustainable", description: "Eco-friendly materials and processes" },
  { id: "small_batch", icon: "🔢", label: "Small-batch or made to order", description: "Limited quantities or custom made" },
  { id: "custom_pieces", icon: "✂️", label: "Custom pieces", description: "One-of-a-kind, bespoke items" },
  { id: "wholesale_ready", icon: "📦", label: "Wholesale ready", description: "Ready for bulk orders and distribution" },
  { id: "ready_to_ship", icon: "🚚", label: "Ready to ship", description: "Items in stock and available immediately" },
  { id: "pre_order_only", icon: "⏰", label: "Pre order only", description: "Made after orders are placed" }
];

export default function ProductionStyleStep() {
  const [selectedStyles, setSelectedStyles] = useState([]);
  const navigate = useNavigate();
  
  const handleStyleToggle = (styleId) => {
    setSelectedStyles(prev => {
      if (prev.includes(styleId)) {
        return prev.filter(id => id !== styleId);
      } else {
        return [...prev, styleId];
      }
    });
  };
  
  const handleNextClick = async () => {
    if (selectedStyles.length === 0) return;
    
    try {
      const response = await fetch("/api/onboarding/production_style", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ production_styles: selectedStyles })
      });
      
      if (response.ok) {
        navigate("/onboarding/designer-role");
      } else {
        console.error("Failed to save production styles");
      }
    } catch (error) {
      console.error("Error saving production styles:", error);
    }
  };
  
  return (
    <OnboardingLayout
      backUrl="/onboarding/product-type"
      title="Production Style"
      subtitle="Select all that apply to your business model"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {productionStyles.map((style) => (
          <div
            key={style.id}
            className={`flex flex-col border rounded-lg p-4 cursor-pointer transition-all ${
              selectedStyles.includes(style.id)
                ? "border-purple-500 bg-purple-50 shadow-sm"
                : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
            }`}
            onClick={() => handleStyleToggle(style.id)}
          >
            <div className="flex items-center mb-2">
              <div className="text-2xl mr-3">{style.icon}</div>
              <div className="text-sm font-medium">{style.label}</div>
              {selectedStyles.includes(style.id) && (
                <div className="ml-auto">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-600">{style.description}</div>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleNextClick}
        disabled={selectedStyles.length === 0}
        className={`mt-8 px-6 py-2 rounded-full font-medium text-white ${
          selectedStyles.length > 0
            ? "bg-indigo-500 hover:bg-indigo-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </OnboardingLayout>
  );
} 