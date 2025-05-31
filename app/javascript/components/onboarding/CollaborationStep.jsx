import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

const collaborationOptions = [
  {
    id: "manufacturing",
    icon: "🏭",
    title: "Manufacturing",
    description: "Partner with manufacturers to bring your designs to life"
  },
  {
    id: "retail",
    icon: "🛍️",
    title: "Retail Partnerships",
    description: "Connect with retailers to showcase and sell your designs"
  },
  {
    id: "consultation",
    icon: "💼",
    title: "Design Consultation",
    description: "Offer your expertise to brands seeking design input"
  },
  {
    id: "custom",
    icon: "✂️",
    title: "Custom Orders",
    description: "Create bespoke designs for individual clients"
  },
  {
    id: "mentorship",
    icon: "🎓",
    title: "Mentorship",
    description: "Guide emerging designers and share your knowledge"
  }
];

export default function CollaborationStep() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const toggleOption = (optionId) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };
  
  const handleNextClick = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/onboarding/collaboration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ collaboration_preferences: selectedOptions })
      });
      
      if (response.ok) {
        navigate("/onboarding/complete");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to save collaboration preferences");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error saving collaboration preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <OnboardingLayout
      backUrl="/onboarding/location"
      title="How would you like to collaborate?"
    >
      <p className="text-gray-600 mb-6">Select all that apply</p>
      
      {error && (
        <div className="mb-6 bg-red-50 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="space-y-3">
        {collaborationOptions.map((option) => (
          <div
            key={option.id}
            className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all ${
              selectedOptions.includes(option.id)
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
            }`}
            onClick={() => toggleOption(option.id)}
          >
            <div className="text-2xl mr-4">{option.icon}</div>
            <div className="flex-1">
              <h3 className="font-medium">{option.title}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
            <div className="ml-4">
              <div 
                className={`w-5 h-5 rounded border ${
                  selectedOptions.includes(option.id)
                    ? "bg-purple-500 border-purple-500 flex items-center justify-center"
                    : "border-gray-300"
                }`}
              >
                {selectedOptions.includes(option.id) && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 text-white" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleNextClick}
        disabled={isLoading}
        className={`mt-8 px-6 py-2 rounded-full font-medium text-white ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-500 hover:bg-indigo-600"
        }`}
      >
        {isLoading ? "Creating Profile..." : "Complete Profile"}
      </button>
    </OnboardingLayout>
  );
}
