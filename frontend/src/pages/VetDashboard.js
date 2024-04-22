import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../css/vetdashboard.css';
import VetHeader from '../components/Vet components/VetHeader';

function VetDashboard() {
  return (
    <>
      <VetHeader />
      <div
        className="vet-dashboard"
        style={{
          backgroundImage: `url('/images/Vetdashboard.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
      </div>
      <Footer />
    </>
  );
}

export default VetDashboard;