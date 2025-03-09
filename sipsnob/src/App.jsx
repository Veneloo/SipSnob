import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import LogIn from './pages/login';
import SignUp from './pages/signup';
import Launch from './pages/launch';
import Navbar from './components/Navbar'; 
import Profile from './pages/profile'; 
import Discover from './pages/discover'; 
import Ratings from './pages/ratings'; 

function App() {
  return (
    <BrowserRouter>
      {/* Show Navbar on all pages EXCEPT login, signup, and launch */}
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route path="/pages/login" element={<LogIn />} />
        <Route path="/pages/signup" element={<SignUp />} />
      </Routes>

      {/* Navbar should be present on all other pages */}
      <Routes>
        <Route path="/home" element={<><Navbar /><HomePage /></>} />
        <Route path="/profile" element={<><Navbar /><Profile /></>} />
        <Route path="/discover" element={<><Navbar /><Discover /></>} />
        <Route path="/ratings" element={<><Navbar /><Ratings /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
