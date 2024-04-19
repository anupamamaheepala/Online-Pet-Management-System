// Cardpayreport.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cardpayreport = () => {
  const [cardPayments, setCardPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/cardpayreport");
        setCardPayments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching card payment report:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Card Payment Report</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">
          {cardPayments.map((payment, index) => (
            <div className="card" key={index}>
              <h3>Name: {payment.name}</h3>
              <p>Email: {payment.email}</p>
              <p>Phone Number: {payment.phonenumber}</p>
              <p>Address: {payment.address}</p>
              <p>Purpose: {payment.purpose}</p>
              <p>Amount: {payment.amount}</p>
              <p>Card Number: {payment.cardNumber}</p>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Cardpayreport;
