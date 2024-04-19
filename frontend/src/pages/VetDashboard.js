import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Footer from '../components/Footer';
import '../css/vetdashboard.css'; 
import AdminHeader from '../components/AdminHeader';
import VetHeader from '../components/Vet components/VetHeader';

function VetDashboard() {

  return (
    <>
      <AdminHeader/>
      
      <VetHeader/>
      <div className="vet-dashboard">
      </div>
      <h1>VET dashboard</h1>
      <h1>VET dashboard</h1>
      <h1>VET dashboard</h1>
      <h1>VET dashboard</h1>
      <h1>VET dashboard</h1>
      <Footer />
    </>
  );
}

export default VetDashboard;
