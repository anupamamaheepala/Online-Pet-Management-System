import React, { useState } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/feedbackinquiry.css';

function FeedbackInquiry() {
  const [values, setValues] = useState({
    customerName: '',
    customerEmail: '',
    customerContactNumber: '',
    inquiryType: '',
    inquiryDescription: '',
  });

  const handleChange = (event) => {
    const newData = { ...values };
    newData[event.target.id] = event.target.value;
    setValues(newData);
  };

  const sendDataToDB = () => {
    Axios.post('http://localhost:5000/api/v1/store-customer-inquiry', {
      inquiryType: values.inquiryType,
      inquiryDescription: values.inquiryDescription,
      customerContactNumber: values.customerContactNumber,
      customerEmail: values.customerEmail,
      customerName: values.customerName,
    })
      .then(() => {
        console.log('Successful Inquiry Submission');
      })
      .catch(() => {
        console.log('Unsuccessful Inquiry Submission');
      });
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (values.customerName === '') {
      toast.error('Please Enter Your Name!!!', {
        position: 'top-center',
      });
      return;
    }

    if (values.customerEmail === '') {
      toast.error('Please Enter Your Email!!!', {
        position: 'top-center',
      });
      return;
    }

    if (values.customerContactNumber === '') {
      toast.error('Please Enter Your Phone Number!!!', {
        position: 'top-center',
      });
      return;
    }

    if (!validatePhoneNumber(values.customerContactNumber)) {
      toast.error('Phone Number should have only 10 Digits!!!', {
        position: 'top-center',
      });
      return;
    }

    if (values.inquiryType === '') {
      toast.error('Please Enter Your Inquiry Type!!!', {
        position: 'top-center',
      });
      return;
    }

    if (values.inquiryDescription === '') {
      toast.error('Please Enter Your Inquiry!!!', {
        position: 'top-center',
      });
      return;
    }

    if (window.confirm('Confirm Inquiry Submission')) {
      sendDataToDB();
      toast.success('Successfully submitted Inquiry!!!!', {
        position: 'top-center',
      });
    }
  };

  return (
    <>
            <Header />
    <div style={{ border: '2px black solid' }} className="container mt-5">
      <h1>Customer Inquiry Portal</h1>
      <ToastContainer />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="customerName" style={{ color: 'black' }}>Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            id="customerName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerEmail" style={{ color: 'black' }}>Email:</label>
          <input
            type="text"
            className="form-control"
            autoComplete="off"
            placeholder="Enter Email"
            onChange={(e) => handleChange(e)}
            id="customerEmail"
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerContactNumber" style={{ color: 'black' }}>Phone:</label>
          <input
            type="tel"
            className="form-control"
            autoComplete="off"
            placeholder="Enter Phone Number"
            onChange={(e) => handleChange(e)}
            id="customerContactNumber"
          />
        </div>
        <label htmlFor="inquiryType" style={{ color: 'black' }}>Inquiry Type:</label>
        <select
          name="inquiry-type"
          onChange={(e) => handleChange(e)}
          id="inquiryType"
          required
        >
          <option value="">Select Inquiry Type</option>
          <option value="Problem with Purchased Goods or Services">Problem with Purchased Goods or Services</option>
          <option value="Delivery Problem">Delivery Problem</option>
          <option value="Invoicing Problem">Invoicing Problem</option>
          <option value="Other">Other</option>
        </select>
        <div className="form-group">
          <label htmlFor="inquiryDescription" style={{ color: 'black' }}>Inquiry:</label>
          <textarea
            className="form-control"
            placeholder="Enter Inquiry"
            onChange={(e) => handleChange(e)}
            id="inquiryDescription"
            rows="15"
          />
          <p id="inquiry-status" className="status" />
        </div>
        <input
          type="submit"
          id="submit-button"
          value="Submit"
          className="btn btn-primary"
        />
      </form>
    </div>
    <Footer />
        </>
  );
}

export default FeedbackInquiry;
