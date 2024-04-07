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

  // Function to handle changes in form fields
  const handleChange = (event) => {
    const newData = { ...values };
    newData[event.target.id] = event.target.value;
    setValues(newData);
  };

  // Function to send form data to the backend
  const sendDataToDB = () => {
    Axios.post('http://localhost:9000/api/v1/store-customer-inquiry', {
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

  // Function to validate phone number format
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Form field validation
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

    // Confirmation dialog for form submission
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
      <div className="custom-container mt-5">
        <h1 className="custom-h1">Customer Inquiry Portal</h1>
        <ToastContainer className="custom-toast-container" />
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* Name field */}
          <div className="custom-form-group">
            <label htmlFor="customerName" className="custom-label">Name:</label>
            <input
              type="text"
              className="custom-input"
              placeholder="Enter Name"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
              id="customerName"
            />
          </div>
          {/* Email field */}
          <div className="custom-form-group">
            <label htmlFor="customerEmail" className="custom-label">Email:</label>
            <input
              type="text"
              className="custom-input"
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(e) => handleChange(e)}
              id="customerEmail"
            />
          </div>
          {/* Phone number field */}
          <div className="custom-form-group">
            <label htmlFor="customerContactNumber" className="custom-label">Phone:</label>
            <input
              type="tel"
              className="custom-input"
              autoComplete="off"
              placeholder="Enter Phone Number"
              onChange={(e) => handleChange(e)}
              id="customerContactNumber"
            />
          </div>
          {/* Inquiry type field */}
          <label htmlFor="inquiryType" className="custom-label">Inquiry Type:</label>
          <select
            name="inquiry-type"
            onChange={(e) => handleChange(e)}
            id="inquiryType"
            className="custom-select"
            required
          >
            <option value="">Select Inquiry Type</option>
            <option value="Problem with Purchased Goods or Services">Problem with Purchased Goods or Services</option>
            <option value="Delivery Problem">Delivery Problem</option>
            <option value="Invoicing Problem">Invoicing Problem</option>
            <option value="Other">Other</option>
          </select>
          {/* Inquiry description field */}
          <div className="custom-form-group">
            <label htmlFor="inquiryDescription" className="custom-label">Inquiry:</label>
            <textarea
              className="custom-textarea"
              placeholder="Enter Inquiry"
              onChange={(e) => handleChange(e)}
              id="inquiryDescription"
              rows="15"
            />
            <p id="inquiry-status" className="status" />
          </div>
          {/* Submit button */}
          <input
            type="submit"
            id="submit-button"
            value="Submit"
            className="custom-button"
          />
        </form>
      </div>
      <Footer />
    </>
  );
}

export default FeedbackInquiry;
