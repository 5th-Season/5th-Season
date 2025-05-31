import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

export default function PersonalInfoStep() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  // Fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/current_user");
        if (response.ok) {
          const data = await response.json();
          setFirstName(data.first_name || "");
          setLastName(data.last_name || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, []);
  
  const handleNextClick = async (e) => {
    e.preventDefault();
    
    if (!firstName || !lastName) {
      setError("Please provide both first and last name");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/onboarding/personal_info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName })
      });
      
      if (response.ok) {
        navigate("/onboarding/brand-info");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to save personal information");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error saving personal info:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <OnboardingLayout
      backUrl="/onboarding/product-type"
      title="Your Full Name"
    >
      {error && (
        <div className="mb-6 bg-red-50 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleNextClick}>
        <div className="mb-6">
          <label htmlFor="firstName" className="block mb-2 font-medium text-gray-700">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
            placeholder="Your first name"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="lastName" className="block mb-2 font-medium text-gray-700">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
            placeholder="Your last name"
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
