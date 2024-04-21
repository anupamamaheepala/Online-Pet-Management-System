import React from 'react';
import SystemAdminHeader from '../components/SystemAdminHeader';
import Footer from '../components/Footer';

const SysadminHome = () => {
  return (
    <>
      <SystemAdminHeader />
      <div className="content">
        <h1>Welcome, System Manager!</h1>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
       
        {/* Add more content as needed */}
      </div>
      <Footer/>
    </>
  );
};

export default SysadminHome;
