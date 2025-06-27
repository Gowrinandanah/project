import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Groupdetails from './components/Groupdetails';
import Creategroup from './components/Creategroup';
import Userprofile from './components/Userprofile';
import Admin from './components/Admin';

if (process.env.NODE_ENV === "development") {
  localStorage.clear(); // remove before deployment
}



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/group/:id" element={<Groupdetails />} />
        <Route path="/create" element={<Creategroup />} />
        <Route path="/profile" element={<Userprofile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
