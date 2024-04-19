import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/cardpaysuccess.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cardpaysuccess = () => {
  const [payerDetails, setPayerDetails] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const payerId = searchParams.get('id');

    const fetchPayerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/cardpay/payerdetails/${payerId}`);
        setPayerDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/cardpay/cardpayments/${payerId}`);
        setCardDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayerDetails();
    fetchCardDetails();

    // Update currentDateTime every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (!payerDetails || !cardDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="cps-container">
        <h2>Payment Successful
          <svg xmlns="http://www.w3.org/2000/svg" className="check-mark" viewBox="0 0 24 24" fill="green" width="48" height="48">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        </h2>
        <h5>Congratulations! Your payment was successful.</h5>
        <h3>Payment Acknowledgement</h3>
        <p><b>Name:</b> {payerDetails.name}</p>
        <p><b>Email:</b> {payerDetails.email}</p>
        <p><b>Phone Number:</b> {payerDetails.phonenumber}</p>
        <p><b>Address:</b> {payerDetails.address}</p>
        <p><b>Purpose:</b> {payerDetails.purpose}</p>
        <p><b>Amount:</b> {payerDetails.amount}</p>
        <p><b>Name on Card:</b> {cardDetails.nameOnCard}</p>
        <p><b>Card Number:</b> {cardDetails.cardNumber}</p>
        <p><b>Date:</b> {currentDateTime.toLocaleDateString()}</p>
        <p><b>Time:</b> {currentDateTime.toLocaleTimeString()}</p>
      </div>
      <Footer />
    </>
  );
};

export default Cardpaysuccess;
