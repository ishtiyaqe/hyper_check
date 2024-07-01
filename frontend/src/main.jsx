import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./components/Auth/SignUp.jsx";
import Login from "./components/Auth/Login.jsx";
import Protected from "./components/Auth/Protected.jsx";
import Home from "./Home.jsx";
import FourOFour from "./components/css/FourOFour.jsx";
import Contact from "./components/Home/Contact.jsx";
import ProductPage from '../src/pages/ProductPage.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import MyAccountPage from './pages/MyAccountPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="contact" element={<Contact />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/myaccount" element={<MyAccountPage />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<FourOFour />} />
    </Route>
  )
);
const clientId = '1029874213459-jpbmh47bbnlle033e16aoi7rgrqbate1.apps.googleusercontent.com';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider
    clientId={clientId}
    redirectUri="http://localhost:8080/myaccount" // Ensure this matches with your Google Cloud Console settings
  >
    <RouterProvider router={router} />

    </GoogleOAuthProvider>
  </React.StrictMode>
);
