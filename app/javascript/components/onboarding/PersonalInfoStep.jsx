import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

export default function PersonalInfoStep() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  
  const handleNextClick = async () => {
    if (!firstName.trim() || !lastName.trim()) return;
    
    try {
      const response = await fetch("/api/onboarding/personal_info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ 
          first_name: firstName, 
          last_name: lastName 
        })
      });
      
      if (response.ok) {
        navigate("/onboarding/brand-info");
      } else {
        console.error("Failed to save personal info");
      }
    } catch (error) {
      console.error("Error saving personal info:", error);
    }
  };
  
  return (
    <OnboardingLayout
      backUrl="/onboarding/brand-attributes"
      title="Your Full Name"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your first name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your last name"
          />
        </div>
      </div>
      
      <button
        onClick={handleNextClick}
        disabled={!firstName.trim() || !lastName.trim()}
        className={`mt-8 px-6 py-2 rounded-full font-medium text-white ${
          firstName.trim() && lastName.trim()
            ? "bg-indigo-500 hover:bg-indigo-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </OnboardingLayout>
  );
}
