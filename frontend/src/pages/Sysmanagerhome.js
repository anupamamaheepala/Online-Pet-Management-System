import React from 'react';
import SystemAdminHeader from '../components/SystemAdminHeader';
import Footer from '../components/Footer';
import '../css/sysmanagerhome.css';

const SysadminHome = () => {
  return (
    <>
      <SystemAdminHeader />
      <body className="sysbody">
      <div className="content">
        <h1 className="sysh1">Welcome, System Manager!</h1>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
       
        {/* Add more content as needed */}
      </div>
      </body>
      <Footer/>
    </>
  );
};

export default SysadminHome;
