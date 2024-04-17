import React from 'react';
import '../css/cardpaysuccess.css';
import Header from '../components/Header';
import Footer from '../components/Footer';


const Cardpaysuccess = () => {
  return (
    <>
    <Header />
    <div className="cps-container">
    <div className="cps-bodycon">
      <h2>Payment Successful</h2>
      <p>Congratulations! Your payment was successful.</p>
    </div>
    <div className="cps-buttoncon">
      <button className="cps-button">Download Report</button>
      <button className="cps-button">Back to Home</button>
    </div>
    </div>
    <Footer />
    </>
  );
};

export default Cardpaysuccess;
