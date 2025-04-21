import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtwCQaEqSHO0eXxmcgiE7mobVpuKrJkFs",
  authDomain: "sipsnob-561ee.firebaseapp.com",
  projectId: "sipsnob-561ee",
  storageBucket: "sipsnob-561ee.appspot.com",
  messagingSenderId: "817277975536",
  appId: "1:817277975536:web:02b26705339b2b62b33b35",
  measurementId: "G-BVL98THBKT"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
