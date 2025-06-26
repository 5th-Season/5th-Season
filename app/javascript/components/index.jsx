import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// List of routes that are handled by Rails and should NOT load React
const RAILS_ROUTES = [
  '/login',
  '/signup',
  '/logout'
];

document.addEventListener("turbo:load", () => {
  // Check if current path is handled by Rails
  const isRailsRoute = RAILS_ROUTES.some(route => 
    window.location.pathname.startsWith(route)
  );
  
  // Only mount React if we're NOT on a Rails-handled page
  if (!isRailsRoute) {
    const root = createRoot(
      document.body.appendChild(document.createElement("div"))
    );
    root.render(<App />);
  }
});