import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import HomePage from './pages/home'
import LogIn from './pages/login';
import SignUp from './pages/signup';
import Launch from './pages/launch';



function App() {
  return (
      <div>
    <BrowserRouter>
       
    

      <Routes>
        <Route path="/pages/login" element={<LogIn />}/>
        <Route path="/pages/signup" element={<SignUp />}/>
        <Route path="/" element={<Launch />}/>


      </Routes>
    </BrowserRouter> 
     </div>

  )
}

export default App
