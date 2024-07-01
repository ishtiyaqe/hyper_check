import React, { useEffect, useState } from 'react';
import "./index.css";
import HeroSection from "./components/css/HeroSection";
import Accordion from "./components/css/Accordion";
import Navbar from "./components/css/Navbar";
import Stats from "./components/css/Stats";
import Clients from '../src/components/api/client'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const fetchAccountData = async () => {
    try {
        const userResponse = await Clients.get('/api/user/', {
            withCredentials: true,
        });
        // setLoading(false);
    } catch (error) {
        console.error('Error fetching account data:', error);
        // setLoading(false);
        // Redirect to login page on error (assuming you have a route for '/login')
        navigate('/login');
    }
};



useEffect(() => {
  fetchAccountData();
}, []);
  return (
    <>
      <Navbar />
      <HeroSection />
      <Stats />
      <Accordion />
    </>
  );
};

export default Home;
