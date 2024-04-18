import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/cardpayadmin.css'; // Import CSS file

const CardPayAdmin = () => {
  const [cardPayments, setCardPayments] = useState([]);

  useEffect(() => {
    const fetchCardPayments = async () => {
      try {
        const response = await axios.get("http://localhost:9000/cardpay/cardpayments");
        setCardPayments(response.data);
      } catch (error) {
        console.error('Error fetching card payments:', error);
      }
    };

    fetchCardPayments();
  }, []);

return (
  <div className="card-pay-admin-container">
    <h1 className="card-pay-admin-title">All Card Payments</h1>
    <table className="card-pay-admin-table">
      <thead>
        <tr>
          <th className="card-pay-admin-table-header">Payer Name</th>
          <th className="card-pay-admin-table-header">Payer Email</th>
          <th className="card-pay-admin-table-header">Payer Phone Number</th> {/* Add new header */}
          <th className="card-pay-admin-table-header">Purpose</th> {/* Add new header */}
          <th className="card-pay-admin-table-header">Amount</th> {/* Add new header */}
          <th className="card-pay-admin-table-header">Card Number</th>
        </tr>
      </thead>
      <tbody>
        {cardPayments.map((payment, index) => (
          <tr key={index} className="card-pay-admin-table-row">
            <td className="card-pay-admin-table-data">{payment.payerName}</td>
            <td className="card-pay-admin-table-data">{payment.payerEmail}</td>
            <td className="card-pay-admin-table-data">{payment.payerPhoneNumber}</td> {/* Add new data */}
            <td className="card-pay-admin-table-data">{payment.purpose}</td> {/* Add new data */}
            <td className="card-pay-admin-table-data">{payment.amount}</td> {/* Add new data */}
            <td className="card-pay-admin-table-data">{payment.cardNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default CardPayAdmin;
