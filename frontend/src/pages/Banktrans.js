import React, { useState } from 'react';
import '../css/banktrans.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Banktrans = () => {
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [depositSlip, setDepositSlip] = useState(null); // For file upload

  const handleFileChange = (e) => {
      // Handle file selection (e.g., store the file in state)
      const selectedFile = e.target.files[0];
      setDepositSlip(selectedFile);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission (e.g., send data to backend)
      console.log('Form submitted:', { bankName, branchName, depositSlip });
  };

  return (
    <>
    <Header />
      <div className="anubank-transfer">
          <h2>Bank Transfer</h2>
          <form onSubmit={handleSubmit}>
              <div className="anubtform-group">
                  <label htmlFor="bankName">Bank Name:</label>
                  <input
                      type="text"
                      id="bankName"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                  />
              </div>
              <div className="anubtform-group">
                  <label htmlFor="branchName">Branch Name:</label>
                  <input
                      type="text"
                      id="branchName"
                      value={branchName}
                      onChange={(e) => setBranchName(e.target.value)}
                  />
              </div>
              <div className="anubtform-group">
                  <label htmlFor="depositSlip">Upload your deposit slip:</label>
                  <input
                      type="file"
                      id="depositSlip"
                      accept=".pdf,.jpg,.png" // Specify allowed file types
                      onChange={handleFileChange}
                  />
              </div>
              <center><button className="anubtbutton" type="submit">Submit</button></center>
          </form>
      </div>
      <Footer />
      </>
  );
};

export default Banktrans;

