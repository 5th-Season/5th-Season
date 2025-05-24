import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from '../components/Navigation';
import Home from '../components/Home';
import Collaborate from '../components/Collaborate';
import Events from '../components/Events';
import EventForm from '../components/EventForm';
import ProfileView from '../components/ProfileView';
import CollectionView from '../components/CollectionView';

const AppRoutes = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collaborate" element={<Collaborate />} />
          <Route path="/launches" element={<Events />} />
          <Route path="/launch/create" element={<EventForm />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/sample-profile" element={<ProfileView />} />
          <Route path="/collection/:collectionId" element={<CollectionView />} />
        </Routes>
      </Router>
  )
}

export default AppRoutes;