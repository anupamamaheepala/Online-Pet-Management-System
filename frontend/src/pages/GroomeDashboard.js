import React from 'react';
import Footer from '../components/Footer';
import GroomeHeader from '../components/Groome components/GroomerHeader';

function GroomeDashboard() {
  return (
    <>
   
    <GroomeHeader/>
    <div
        className="vet-dashboard"
        style={{
          backgroundImage: `url('/images/petgroomer.jpg')`,
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
    <Footer/>
    </>
  )
}

export default GroomeDashboard