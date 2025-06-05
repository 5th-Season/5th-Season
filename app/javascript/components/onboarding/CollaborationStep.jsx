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
    description: "Accept commissions for bespoke pieces"
  },
  {
    id: "mentorship",
    icon: "🎓",
    title: "Mentorship",
    description: "Guide and support other emerging designers"
  }
];

export default function CollaborationStep() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();
  
  const handleOptionToggle = (optionId) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };
  
  const handleNextClick = async () => {
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
        const data = await response.json();
        // Navigate to completion with designer data
        navigate("/onboarding/complete", { 
          state: { 
            designer: {
              id: data.designer_id,
              username: data.username
            }
          }
        });
      } else {
        console.error("Failed to complete onboarding");
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };
  
  return (
    <OnboardingLayout
      backUrl="/onboarding/location"
      title="How would you like to collaborate?"
      subtitle="Select all that apply"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {collaborationOptions.map((option) => (
          <div
            key={option.id}
            className={`flex flex-col border rounded-lg p-4 cursor-pointer transition-all ${
              selectedOptions.includes(option.id)
                ? "border-purple-500 bg-purple-50 shadow-sm"
                : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
            }`}
            onClick={() => handleOptionToggle(option.id)}
          >
            <div className="flex items-center mb-2">
              <div className="text-2xl mr-3">{option.icon}</div>
              <div className="text-sm font-medium">{option.title}</div>
              {selectedOptions.includes(option.id) && (
                <div className="ml-auto">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-600">{option.description}</div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          {selectedOptions.length === 0 
            ? "Choose your collaboration preferences (optional)"
            : `${selectedOptions.length} collaboration type${selectedOptions.length !== 1 ? 's' : ''} selected`
          }
        </p>
      </div>
      
      <button
        onClick={handleNextClick}
        className="mt-8 px-6 py-2 rounded-full font-medium text-white bg-indigo-500 hover:bg-indigo-600"
      >
        Complete Profile
      </button>
    </OnboardingLayout>
  );
}
