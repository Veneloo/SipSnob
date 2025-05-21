import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import LogIn from './pages/login';
import SignUp from './pages/signup';
import Launch from './pages/launch';
import Navbar from './components/Navbar'; 
//import Profile from './pages/profile'; 
import Discover from './pages/discover'; 
import Ratings from './pages/ratings'; 
import Settings from './pages/settings';
import ShopDetails from './pages/shop_details';
import ProfilePage from './pages/profile';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FriendProfilePage from "./pages/friendProfilePage";


function App() {
  return (
    <BrowserRouter>
      {/* Show Navbar on all pages EXCEPT login, signup, and launch */}
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pages/discover" element={<Discover />} />
        <Route path="/pages/ratings" element={<Ratings />} />
        

      

      {/* Navbar should be present on all other pages */}
      
        <Route path="/home" element={<><Navbar/><HomePage /></>} />
        <Route path="/settings" element={<><Navbar/><Settings /></>} />
        <Route path="/discover" element={<><Navbar/><Discover /></>} />
        <Route path="/ratings/:shopId" element={<><Navbar /><Ratings /></>} />
        <Route path="/shop_details/:shopId" element={<ShopDetails />} />
        <Route path="/profile" element={<><Navbar/><ProfilePage /></>} />
        <Route path="/profile/:friendId" element={<FriendProfilePage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
