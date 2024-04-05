// PayStatus.js

import React from 'react';

const Paystatus = ({ payerInfo, billAmount }) => {
  return (
    <div>
      <h2>Payment Status</h2>
      <p><strong>Name:</strong> {payerInfo.name}</p>
      <p><strong>Email:</strong> {payerInfo.email}</p>
      <p><strong>Phone Number:</strong> {payerInfo.phonenumber}</p>
      <p><strong>Address:</strong> {payerInfo.address}</p>
      <p><strong>Bill Amount:</strong> ${billAmount}</p>
    </div>
  );
}

export default Paystatus;
