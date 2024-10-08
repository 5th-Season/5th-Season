import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from '../components/Navigation';
import Home from '../components/Home';
import Collaborate from '../components/Collaborate';
import Events from '../components/Events';
import EventForm from '../components/EventForm';

const AppRoutes = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collaborate" element={<Collaborate />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/create" element={<EventForm />} />
        </Routes>
      </Router>
  )
}

export default AppRoutes;