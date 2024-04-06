import React from 'react';
import { useParams } from 'react-router-dom';

const Paystatus = () => {
  const { name, email, phonenumber, address } = useParams();

  return (
    <div>
      <h2>Payment Status</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone Number:</strong> {phonenumber}</p>
      <p><strong>Address:</strong> {address}</p>
    </div>
  );
}

export default Paystatus;
