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

  // Set initial form state
  const [formData, setFormData] = useState({
    orderName: '',
    orderContactNo: '',
    orderAddress: '',
    deliveryDate: getCurrentDate(), // Set to the current date
    pdfFile: null, // File state for PDF upload
  });

  const { orderName, orderContactNo, orderAddress, deliveryDate, pdfFile } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle PDF file upload
  const handleFileUpload = (e) => {
    setFormData({ ...formData, pdfFile: e.target.files[0] });
  };

  // Function to allow only numeric characters in the contact number field
  const onKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) { // Prevent non-numeric input
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
      const formDataToSend = new FormData();
      formDataToSend.append('orderName', orderName);
      formDataToSend.append('orderContactNo', orderContactNo);
      formDataToSend.append('orderAddress', orderAddress);
      formDataToSend.append('deliveryDate', deliveryDate);
      formDataToSend.append('pdfFile', pdfFile);

      await axios.post('http://localhost:9000/orders/add', formDataToSend);
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
        deliveryDate: getCurrentDate(), // Reset to the current date
        pdfFile: null,
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
        <div className="form-group">
          <label htmlFor="pdfFile">Add Cart Slip:</label>
          <input type="file" id="pdfFile" name="pdfFile" accept=".pdf" onChange={handleFileUpload} />
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
