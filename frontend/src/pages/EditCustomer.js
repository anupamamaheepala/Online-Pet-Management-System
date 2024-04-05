// export default EditCustomer;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/register.css';

const EditCustomer = () => {
  const { customerId } = useParams();
  const [customerData, setCustomerData] = useState({
    username: '',
    email: '',
    contactNumber: '',
    address: '',
    password: ''
  });

  useEffect(() => {
    // Fetch customer data by ID
    axios.get(`http://localhost:9000/customer/${customerId}`)
      .then((res) => {
        setCustomerData(res.data); // Set fetched customer data to state
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to fetch customer data');
      });
  }, [customerId]); // Include 'customerId' in the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update customer data
    axios.put(`http://localhost:9000/customer/${customerId}`, customerData)
      .then((res) => {
        console.log(res.data);
        alert('Customer updated successfully');
        
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to update customer');
      });
  };
  return (
    <>
            <Header />
            <br></br>
    <div className="edit-customer-container">
      <h2>Edit Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="edit-customer-form-group">
          <label className="edit-customer-label">Username:</label>
          <input className="edit-customer-input" type="text" name="username" value={customerData.username} onChange={handleChange} required />
        </div>
        <div className="edit-customer-form-group">
          <label className="edit-customer-label">Email:</label>
          <input className="edit-customer-input" type="email" name="email" value={customerData.email} onChange={handleChange} required />
        </div>
        <div className="edit-customer-form-group">
          <label className="edit-customer-label">Contact Number:</label>
          <input className="edit-customer-input" type="text" name="contactNumber" value={customerData.contactNumber} onChange={handleChange} required />
        </div>
        <div className="edit-customer-form-group">
          <label className="edit-customer-label">Address:</label>
          <input className="edit-customer-input" type="text" name="address" value={customerData.address} onChange={handleChange} required />
        </div>
        <div className="edit-customer-form-group">
          <label className="edit-customer-label">Password:</label>
          <input className="edit-customer-input" type="password" name="password" value={customerData.password} onChange={handleChange} required />
        </div>
        <button className="edit-customer-button" type="submit">Update</button>
        &nbsp;
        {/* Navigate to AllCustomers page using Link */}
        <Link to="/AllCustomers" className="edit-customer-link-button">
          <button className="edit-customer-button">Back to All Customers</button>
        </Link>
      </form>
    </div>
    <br></br>
    <Footer />
        </>
  );
  
};

export default EditCustomer;
