// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMwnXrHiPlk7yIRnYW-eu5HVB4CJn-hGo",
  authDomain: "react-e64f9.firebaseapp.com",
  projectId: "react-e64f9",
  storageBucket: "react-e64f9.appspot.com",
  messagingSenderId: "517390994304",
  appId: "1:517390994304:web:e9cedef97bb438f21d0f65",
  measurementId: "G-P7MSFT0NBQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();

export default app;
