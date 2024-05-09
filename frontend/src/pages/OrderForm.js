import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/orderform.css'; 

const OrderForm = () => {
  // Function to get the current date
  const getCurrentDate = () => {
    const today = new Date(); 
    return today.toISOString().split('T')[0]; 
  };

  // Set initial form state
  const [formData, setFormData] = useState({
    orderName: '',
    orderContactNo: '',
    orderAddress: '',
    deliveryDate: getCurrentDate(), 
  });

  const { orderName, orderContactNo, orderAddress, deliveryDate } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to allow only numeric characters in the contact number field
  const onKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) { 
      e.preventDefault();
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Ensure the contact number is exactly 10 digits
    if (orderContactNo.length !== 10) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Contact Number',
        text: 'Please enter a valid 10-digit contact number.',
      });
      return;
    }

    try {
      await axios.post('http://localhost:9000/orders/add', formData);
      Swal.fire({
        icon: 'success',
        title: 'Order Placed',
        text: 'Your order has been placed successfully!',
      });

      // Reset form data
      setFormData({
        orderName: '',
        orderContactNo: '',
        orderAddress: '',
        deliveryDate: getCurrentDate(), 
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Request Error',
        text: `Error placing the order: ${err.message}`,
      });
    }
  };

  return (
    <>
      <Header />
      <form className="order-form" onSubmit={onSubmit}>
        <h2>Place Your Order</h2>
        <div className="form-group">
          <label htmlFor="orderName">Name:</label>
          <input type="text" id="orderName" name="orderName" value={orderName} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="orderContactNo">Contact No:</label>
          <input type="tel" id="orderContactNo" name="orderContactNo" maxLength={10} value={orderContactNo} onChange={onChange} onKeyPress={onKeyPress} />
        </div>
        <div className="form-group">
          <label htmlFor="orderAddress">Address:</label>
          <textarea id="orderAddress" name="orderAddress" value={orderAddress} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="deliveryDate">Ordering Date:</label>
          <input type="date" id="deliveryDate" name="deliveryDate" value={deliveryDate} readOnly />
        </div>
        <button type="submit" className="submit-button">Place Order</button>
      </form>
      <div className="important-note">
        <p>** Important: We deliver within 5-10 working days. Deliveries do not occur on Saturdays or Sundays. **</p>
      </div>
      <Footer />
    </>
  );
};

export default OrderForm;
