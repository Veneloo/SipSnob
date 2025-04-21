import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { registerSW } from "virtual:pwa-register";
import { AuthProvider } from "./context/authContext";

registerSW();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}