import React, { useEffect, useState } from 'react';
import '../css/banktrans.css';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Banktrans = ({ submitted, data }) => {
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [depositSlip, setDepositSlip] = useState(null);
  const [dsPreview, setDsPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!submitted) {
      setBankName('');
      setBranchName('');
      setDepositSlip(null);
      setDsPreview(null);
      setErrorMessage('');
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setBankName(data.bankName);
      setBranchName(data.branchName);
      setDepositSlip(data.depositSlip);
    }
  }, [data]);

  const onInputChange = (e) => {
    const file = e.target.files[0];
    setDepositSlip(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setDsPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!bankName || !branchName || !depositSlip) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('bankName', bankName);
      formData.append('branchName', branchName);
      formData.append('depositSlip', depositSlip);

      const response = await axios.post(
        "http://localhost:9000/banktrans/bpay",
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log('Add product response: ', response.data);
      // Assuming you want to reset the form after successful submission
      setBankName('');
      setBranchName('');
      setDepositSlip(null);
      setDsPreview(null);
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding product: ', error);
      setErrorMessage('Oops... Something went wrong!'); // Set error message
    }
  };

  return (
    <>
      <Header />
      <div className="anubank-transfer">
        <h2>Bank Transfer</h2>
        <form onSubmit={onSubmit}>
          <div className="anubtform-group">
            <label>Bank Name:</label>
            <select type="text"
              id="bankName"
              name="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required>
              <option value="" disabled>Select bank name</option>
              <option value="Bank of Ceylon">Bank of Ceylon (BOC)</option>
              <option value="People's Bank">People's Bank</option>
              <option value="National Savings Bank">National Savings Bank (NSB)</option>
              <option value="Hatton National Bank PLC">Hatton National Bank PLC (HNB)</option>
              <option value="Commercial Bank of Ceylon PLC">Commercial Bank of Ceylon PLC</option>
              <option value="Sampath Bank PLC">Sampath Bank PLC</option>
              <option value="Seylan Bank PLC">Seylan Bank PLC</option>
              <option value="Amana Bank PLC">Amana Bank PLC</option>
            </select>
          </div>
          <div className="anubtform-group">
            <label>Branch Name:</label>
            <input
              type="text"
              id="branchName"
              name="branchName"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              required
            />
          </div>
          <div className="anubtform-group">
            <label>Upload your deposit slip:</label>
            <input
              type="file"
              id="depositSlip"
              name="depositSlip"
              accept=".pdf,.jpg,.png"
              onChange={onInputChange}
              required
            />
          </div>
          <center>
            <button className="anubtbutton" type="submit">
              Confirm Payment
            </button>
          </center>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <Footer />
    </>
  );
};

export default Banktrans;
