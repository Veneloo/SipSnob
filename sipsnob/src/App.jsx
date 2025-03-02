import { useState } from 'react'

import './App.css'

import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import HomePage from './pages/home'
import LogIn from './pages/login';
import SignUp from './pages/signup';

function SignIn(){


}

function App() {
  return (
      <div>
      <h1> SipSnob </h1>
    <BrowserRouter>
       
    
      <nav>
      <Link to="/pages/login">Login</Link>
      <Link to="/pages/signup">Signup</Link>

      </nav>
      <Routes>
        <Route path="/" element={<h2> Log In </h2>}/>


      </Routes>
      <h2>  Sign Up</h2>
    </BrowserRouter> 
     </div>

  )
}

export default App
