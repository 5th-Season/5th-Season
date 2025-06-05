import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

const brandAttributes = [
  { id: "black_owned", icon: "✊🏿", label: "Black-owned", description: "Black-owned business" },
  { id: "women_owned", icon: "👩", label: "Women owned", description: "Women-owned business" },
  { id: "size_inclusive", icon: "👥", label: "Size Inclusive", description: "Offers extended size ranges" },
  { id: "emerging_designer", icon: "🌟", label: "Emerging Designer", description: "New or up-and-coming designer" },
  { id: "luxury", icon: "💎", label: "Luxury", description: "High-end, premium products" },
  { id: "bold_avant_garde", icon: "🎭", label: "Bold/Avant-garde", description: "Experimental and artistic designs" },
  { id: "everyday_wear", icon: "👕", label: "Everyday Wear", description: "Comfortable, wearable pieces" },
  { id: "functional_fashion", icon: "⚙️", label: "Functional fashion", description: "Practical and purposeful design" },
  { id: "experimental_materials", icon: "🧪", label: "Experimental materials", description: "Innovative fabric and material use" }
];

export default function BrandAttributesStep() {
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const navigate = useNavigate();
  const maxSelection = 3;
  
  const handleAttributeToggle = (attributeId) => {
    setSelectedAttributes(prev => {
      if (prev.includes(attributeId)) {
        return prev.filter(id => id !== attributeId);
      } else if (prev.length < maxSelection) {
        return [...prev, attributeId];
      }
      return prev; // Don't add if already at max
    });
  };
  
  const handleNextClick = async () => {
    try {
      const response = await fetch("/api/onboarding/brand_attributes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ brand_attributes: selectedAttributes })
      });
      
      if (response.ok) {
        navigate("/onboarding/personal-info");
      } else {
        console.error("Failed to save brand attributes");
      }
    } catch (error) {
      console.error("Error saving brand attributes:", error);
    }
  };
  
  return (
    <OnboardingLayout
      backUrl="/onboarding/designer-role"
      title="Brand Attributes"
      subtitle={`Choose up to ${maxSelection} attributes that describe your brand (${selectedAttributes.length}/${maxSelection} selected)`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brandAttributes.map((attribute) => {
          const isSelected = selectedAttributes.includes(attribute.id);
          const isDisabled = !isSelected && selectedAttributes.length >= maxSelection;
          
          return (
            <div
              key={attribute.id}
              className={`flex flex-col border rounded-lg p-4 cursor-pointer transition-all ${
                isSelected
                  ? "border-purple-500 bg-purple-50 shadow-sm"
                  : isDisabled
                  ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
                  : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
              }`}
              onClick={() => !isDisabled && handleAttributeToggle(attribute.id)}
            >
              <div className="flex items-center mb-2">
                <div className="text-2xl mr-3">{attribute.icon}</div>
                <div className="text-sm font-medium">{attribute.label}</div>
                {isSelected && (
                  <div className="ml-auto">
                    <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-600">{attribute.description}</div>
            </div>
          );
        })}
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          {selectedAttributes.length === 0 
            ? "Select attributes that best represent your brand (optional)"
            : selectedAttributes.length === maxSelection
            ? "Maximum selections reached. Deselect an attribute to choose another."
            : `You can select ${maxSelection - selectedAttributes.length} more attribute${maxSelection - selectedAttributes.length !== 1 ? 's' : ''}.`
          }
        </p>
      </div>
      
      <button
        onClick={handleNextClick}
        className="mt-8 px-6 py-2 rounded-full font-medium text-white bg-indigo-500 hover:bg-indigo-600"
      >
        Next
      </button>
    </OnboardingLayout>
  );
} 