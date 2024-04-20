import React from 'react';
import Header from '../components/Header';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';
import GroomeHeader from '../components/Groome components/GroomerHeader';

function GroomeDashboard() {
  return (
    <>
    <AdminHeader/>
    <GroomeHeader/>
    <div>GroomeDashboard</div>
    <Footer/>
    </>
  )
}

export default GroomeDashboard