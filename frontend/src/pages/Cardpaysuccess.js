import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cardpaysuccess = () => {
  const [payerDetails, setPayerDetails] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);

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
  }, []);

  if (!payerDetails || !cardDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Payment Successful</h2>
      <p>Congratulations! Your payment was successful.</p>
      <h3>Payer Details:</h3>
      <p>Name: {payerDetails.name}</p>
      <p>Email: {payerDetails.email}</p>
      <p>Phone Number: {payerDetails.phonenumber}</p>
      <p>Address: {payerDetails.address}</p>
      <p>Purpose: {payerDetails.purpose}</p>
      <p>Amount: {payerDetails.amount}</p>
      <p>Name on Card: {cardDetails.nameOnCard}</p>
      <p>Card Number: {cardDetails.cardNumber}</p>
    </div>
  );
};

export default Cardpaysuccess;
