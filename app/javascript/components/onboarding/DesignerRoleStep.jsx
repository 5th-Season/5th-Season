import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

const designerRoles = [
  { id: "fashion_designer", icon: "✨", label: "Fashion Designer", description: "Create and design clothing collections" },
  { id: "textile_artist", icon: "🧵", label: "Textile Artist", description: "Focus on fabric art and textile creation" },
  { id: "pattern_maker", icon: "📐", label: "Pattern maker/Tailor", description: "Specialize in pattern making and tailoring" },
  { id: "visual_artist", icon: "🎨", label: "Visual Artists/Illustrator", description: "Create visual designs and illustrations for fashion" }
];

export default function DesignerRoleStep() {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  
  const handleNextClick = async () => {
    if (!selectedRole) return;
    
    try {
      const response = await fetch("/api/onboarding/designer_role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ designer_role: selectedRole })
      });
      
      if (response.ok) {
        navigate("/onboarding/brand-attributes");
      } else {
        console.error("Failed to save designer role");
      }
    } catch (error) {
      console.error("Error saving designer role:", error);
    }
  };
  
  return (
    <OnboardingLayout
      backUrl="/onboarding/production-style"
      title="How would you describe yourself?"
      subtitle="Choose the role that best fits your creative practice"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {designerRoles.map((role) => (
          <div
            key={role.id}
            className={`flex flex-col border rounded-lg p-4 cursor-pointer transition-all ${
              selectedRole === role.id
                ? "border-purple-500 bg-purple-50 shadow-sm"
                : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
            }`}
            onClick={() => setSelectedRole(role.id)}
          >
            <div className="flex items-center mb-2">
              <div className="text-2xl mr-3">{role.icon}</div>
              <div className="text-sm font-medium">{role.label}</div>
              {selectedRole === role.id && (
                <div className="ml-auto">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-600">{role.description}</div>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleNextClick}
        disabled={!selectedRole}
        className={`mt-8 px-6 py-2 rounded-full font-medium text-white ${
          selectedRole
            ? "bg-indigo-500 hover:bg-indigo-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </OnboardingLayout>
  );
} 