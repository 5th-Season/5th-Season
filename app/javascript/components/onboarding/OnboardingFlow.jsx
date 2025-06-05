import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import all the step components
import UsernameStep from "./UsernameStep";
import ProductTypeStep from "./ProductTypeStep";
import ProductionStyleStep from "./ProductionStyleStep";
import DesignerRoleStep from "./DesignerRoleStep";
import BrandAttributesStep from "./BrandAttributesStep";
import PersonalInfoStep from "./PersonalInfoStep";
import BrandInfoStep from "./BrandInfoStep";
import LocationStep from "./LocationStep";
import CollaborationStep from "./CollaborationStep";
import CompletionStep from "./CompletionStep";

export default function OnboardingFlow() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/onboarding/username" replace />} />
      <Route path="/username" element={<UsernameStep />} />
      <Route path="/product-type" element={<ProductTypeStep />} />
      <Route path="/production-style" element={<ProductionStyleStep />} />
      <Route path="/designer-role" element={<DesignerRoleStep />} />
      <Route path="/brand-attributes" element={<BrandAttributesStep />} />
      <Route path="/personal-info" element={<PersonalInfoStep />} />
      <Route path="/brand-info" element={<BrandInfoStep />} />
      <Route path="/location" element={<LocationStep />} />
      <Route path="/collaboration" element={<CollaborationStep />} />
      <Route path="/complete" element={<CompletionStep />} />
    </Routes>
  );
}
