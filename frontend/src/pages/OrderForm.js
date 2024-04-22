import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/orderform.css'; // Include relevant CSS

const OrderForm = () => {
  // Function to get the current date
  const getCurrentDate = () => {
    const today = new Date(); // Get current date
    return today.toISOString().split('T')[0]; // Format to 'yyyy-mm-dd'
  };

  // Set initial form state, with current date for 'deliveryDate'
  const [formData, setFormData] = useState({
    orderName: '',
    orderContactNo: '',
    orderAddress: '',
    deliveryDate: getCurrentDate(), // Set to the current date
  });

  const { orderName, orderContactNo, orderAddress, deliveryDate } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:9000/orders/add', formData);
      Swal.fire({
        icon: 'success',
        title: 'Order Placed',
        text: 'Your order has been placed successfully!',
      });

      setFormData({
        orderName: '',
        orderContactNo: '',
        orderAddress: '',
        deliveryDate: getCurrentDate(), // Reset to the current date
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
          <input type="tel" id="orderContactNo" name="orderContactNo" maxLength={10} value={orderContactNo} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="orderAddress">Address:</label>
          <textarea id="orderAddress" name="orderAddress" value={orderAddress} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="deliveryDate">Delivery Date:</label>
          <input type="date" id="deliveryDate" name="deliveryDate" value={deliveryDate} readOnly />
        </div>
        <button type="submit" className="submit-button">Place Order</button>
      </form>
      <div className="important-note">
        <p>** Important: We deliver within 5 working days. Deliveries do not occur on Saturdays or Sundays. **</p>
      </div>
      <Footer />
    </>
  );
};

export default OrderForm;
