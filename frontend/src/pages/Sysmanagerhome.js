import React from 'react';
import SystemAdminHeader from '../components/SystemAdminHeader';
import Footer from '../components/Footer';

const SysadminHome = () => {
  return (
    <>
      <SystemAdminHeader />
      <div className="content">
        <h1>Welcome, System Admin!</h1>
        <p>This is the home page for the system admin.</p>
        {/* Add more content as needed */}
      </div>
      <Footer/>
    </>
  );
};

export default SysadminHome;
