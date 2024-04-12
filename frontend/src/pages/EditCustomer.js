import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/register.css';

const EditCustomer = () => {
  const { customerId } = useParams();
  const [customerData, setCustomerData] = useState({
    username: '',
    email: '',
    contactNumbers: [''], // Initialize with an empty string in the array
    address: '',
    password: ''
  });

  useEffect(() => {
    // Fetch customer data by ID
    axios.get(`http://localhost:9000/customer/${customerId}`)
      .then((res) => {
        setCustomerData(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to fetch customer data');
      });
  }, [customerId]);

  // Function to handle form input changes
 // Function to handle form input changes
const handleChange = (e) => {
  const { name, value, dataset } = e.target;
  if (name === 'contactNumbers') {
      const index = parseInt(dataset.index, 10);
      const updatedContactNumbers = [...customerData.contactNumbers];
      const inputValue = value;

      // Validate the contact number
      if (/^\d{0,10}$/.test(inputValue)) {
          updatedContactNumbers[index] = inputValue;
          setCustomerData({ ...customerData, contactNumbers: updatedContactNumbers });
      } else {
          // Alert the user if the input is invalid
          alert("Contact number must contain only numbers and be exactly 10 digits long.");
      }
  } else {
      setCustomerData({ ...customerData, [name]: value });
  }
};


  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
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

  // Function to add a new contact number field
  const handleAddContactNumber = () => {
    setCustomerData({
      ...customerData,
      contactNumbers: [...customerData.contactNumbers, '']
    });
  };

  // Function to remove a contact number field
  const handleRemoveContactNumber = (index) => {
    const updatedContactNumbers = [...customerData.contactNumbers];
    updatedContactNumbers.splice(index, 1);
    setCustomerData({ ...customerData, contactNumbers: updatedContactNumbers });
  };

  return (
    <>
        <Header />
        <div className="edit-customer-container">
            <h2>Edit Customer</h2>
            <form onSubmit={handleSubmit}>
                <div className="edit-customer-form-group">
                    <label className="edit-customer-label">Username:</label>
                    <input
                        className="edit-customer-input"
                        type="text"
                        name="username"
                        value={customerData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="edit-customer-form-group">
                    <label className="edit-customer-label">Email:</label>
                    <input
                        className="edit-customer-input"
                        type="email"
                        name="email"
                        value={customerData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="edit-customer-form-group">
                    <label className="edit-customer-label">Contact Numbers:</label>
                    {customerData.contactNumbers.map((contactNumber, index) => (
                        <div key={index} className="contact-number-input">
                            <input
                                className="edit-customer-input"
                                type="tel"
                                name="contactNumbers"
                                data-index={index}
                                value={contactNumber}
                                onChange={handleChange}
                                required
                                pattern="\d{10}" // Ensures exactly 10 digits
                                title="Contact number must be exactly 10 digits long and contain only numbers." // Validation message
                            />
                            {index > 0 && (
                                <button type="button" className="remove-contact-button" onClick={() => handleRemoveContactNumber(index)}>
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" className="add-contact-button" onClick={handleAddContactNumber}>
                        Add Contact Number
                    </button>
                </div>
                <div className="edit-customer-form-group">
                    <label className="edit-customer-label">Address:</label>
                    <input
                        className="edit-customer-input"
                        type="text"
                        name="address"
                        value={customerData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="edit-customer-form-group">
                    <label className="edit-customer-label">Password:</label>
                    <input
                        className="edit-customer-input"
                        type="password"
                        name="password"
                        value={customerData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="edit-customer-button" type="submit">Update</button>
                &nbsp;
                <Link to="/AllCustomers" className="edit-customer-link-button">
                    <button className="edit-customer-button">Back to All Customers</button>
                </Link>
            </form>
        </div>
        <Footer />
    </>
);

};

export default EditCustomer;
