import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

export default function UsernameStep() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkingExistingUser, setCheckingExistingUser] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user already has a username
    const checkExistingUser = async () => {
      try {
        const response = await fetch("/api/onboarding/current_user_info", {
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          if (userData.username) {
            // User already has username, use it and skip to next step
            const usernameResponse = await fetch("/api/onboarding/username", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
              },
              body: JSON.stringify({ username: userData.username })
            });
            
            if (usernameResponse.ok) {
              navigate("/onboarding/product-type");
              return;
            }
          }
        }
      } catch (error) {
        console.error("Error checking existing user:", error);
      } finally {
        setCheckingExistingUser(false);
      }
    };
    
    checkExistingUser();
  }, [navigate]);
  
  const handleNextClick = async () => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/onboarding/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ username: username.trim() })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        navigate("/onboarding/product-type");
      } else {
        setError(result.error || "Failed to save username");
      }
    } catch (error) {
      console.error("Error saving username:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUsernameChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
    setUsername(value);
    setError("");
  };
  
  if (checkingExistingUser) {
    return (
      <OnboardingLayout
        title="Setting up your profile..."
      >
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      </OnboardingLayout>
    );
  }
  
  return (
    <OnboardingLayout
      backUrl="/"
      title="Choose Your Username"
    >
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="your-unique-username"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          <p className="text-sm text-gray-500 mt-2">
            This will be your unique identifier and will appear in your profile URL
          </p>
          {error && (
            <p className="text-sm text-red-600 mt-2">{error}</p>
          )}
        </div>
        
        <button
          onClick={handleNextClick}
          disabled={!username.trim() || isLoading}
          className={`w-full px-6 py-3 rounded-lg font-medium text-white ${
            username.trim() && !isLoading
              ? "bg-indigo-500 hover:bg-indigo-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Checking..." : "Next"}
        </button>
      </div>
    </OnboardingLayout>
  );
} 