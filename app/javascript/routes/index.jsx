import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from '../components/Navigation';
import Home from '../components/Home';
import Collaborate from '../components/Collaborate';
import Events from '../components/Events';
import EventForm from '../components/EventForm';
import ProfileView from '../components/ProfileView';
import DynamicProfileView from '../components/DynamicProfileView';
import CollectionView from '../components/CollectionView';
import OnboardingFlow from '../components/onboarding/OnboardingFlow';

// List of routes that are handled by Rails and should be excluded from React routing
const RAILS_ROUTES = [
  '/login',
  '/signup',
  '/logout'
];

const AppRoutes = () => {
  // Check if current path is handled by Rails
  const isRailsRoute = RAILS_ROUTES.some(route => 
    window.location.pathname.startsWith(route)
  );
  
  // Don't render React routes if we're on a Rails-handled page
  if (isRailsRoute) {
    return null;
  }
  
  return (
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collaborate" element={<Collaborate />} />
          <Route path="/launches" element={<Events />} />
          <Route path="/launch/create" element={<EventForm />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/sample-profile" element={<ProfileView />} />
          <Route path="/collection/:collectionId" element={<CollectionView />} />
          
          {/* Designer onboarding flow */}
          <Route path="/onboarding/*" element={<OnboardingFlow />} />
          
          {/* Sample profile view for development purposes */}
          <Route path="/sample/profile" element={<ProfileView />} />
          
          {/* Designer profile route - using the dynamic profile view - MUST BE LAST */}
          <Route path="/:username" element={<DynamicProfileView />} />
        </Routes>
      </Router>
  )
}

export default AppRoutes;