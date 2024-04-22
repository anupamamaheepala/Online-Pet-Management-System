import React, { useState, useEffect } from 'react';
import '../css/makeappointment.css';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShowLoading from '../components/ShowLoading';
import Swal from 'sweetalert2';

const MakeAppointment = () => {
  // State variables to store form data and error messages
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [petType, setPetType] = useState('');
  const [selectService, setSelectService] = useState('');
  const [selectDate, setSelectDate] = useState('');
  const [selectTime, setSelectTime] = useState('');
  const [selectProfession, setSelectProfession] = useState('');
  const [professionOptions, setProfessionOptions] = useState([]);
  const [ownerNameError, setOwnerNameError] = useState('');
  const [ownerContactError, setOwnerContactError] = useState('');

  // Fetch profession options from the backend on component mount
  useEffect(() => {
    fetchProfessionOptions();
  }, []);

  // Update fetchProfessionOptions function to fetch staff members and extract names
  const fetchProfessionOptions = async () => {
    try {
      const response = await axios.get('http://localhost:9000/staff');
      const groomersAndVets = response.data.filter(
        (staff) => staff.designation === 'Groomer' || staff.designation === 'Veterinarian'
      );
      const options = groomersAndVets.map((staff) => ({
        value: staff.staffId, // Using staffId as the value for each option
        label: `${staff.sfirstname} ${staff.slastname}` // Concatenating first name and last name for display
      }));
      setProfessionOptions(options);
    } catch (error) {
      console.error('Error fetching profession options:', error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform frontend validation
    if (!validateForm()) {
      return;
    }

    try {
      // Send form data to server using Axios POST request
      await axios.post('http://localhost:9000/appointment/appointments', {
        ownerName,
        ownerEmail,
        ownerContact,
        petType,
        selectService,
        selectDate,
        selectTime,
        selectProfession
      });

      // Clear form fields after successful submission
      clearForm();

      // Show SweetAlert message
      Swal.fire({
        icon: 'success',
        title: 'Appointment Scheduled Successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        // Show payment message
        Swal.fire({
          icon: 'info',
          title: 'Make the payment for Appointment after Approved',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Navigate to MyAppointments.js
            window.location.href = '/MyAppointments';
          }
        });
      });
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create appointment. Please try again later.',
        confirmButtonText: 'OK'
      });
      // Handle any errors
      console.error('Error submitting form:', error);
    }
  };

  const validateForm = () => {
    let isValid = true;

    // Validate owner's name
    if (/\d/.test(ownerName)) {
      setOwnerNameError('Owner name cannot contain digits');
      isValid = false;
    } else {
      setOwnerNameError('');
    }

    // Validate owner's contact number
    if (!/^\d{10}$/.test(ownerContact)) {
      setOwnerContactError('Contact number must be 10 digits');
      isValid = false;
    } else {
      setOwnerContactError('');
    }

    return isValid;
  };

  const clearForm = () => {
    setOwnerName('');
    setOwnerEmail('');
    setOwnerContact('');
    setPetType('');
    setSelectService('');
    setSelectDate('');
    setSelectTime('');
    setSelectProfession('');
    setOwnerNameError('');
    setOwnerContactError('');
  };

  // Generate options for time picker from 08:00 am to 12:00 pm and then from 01:00 pm to 04:00 pm
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour <= 16; hour++) {
      if (hour !== 12) {
        for (let minute = 0; minute < 60; minute += 60) {
          const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
          const formattedMinute = minute.toString().padStart(2, '0');
          const period = hour < 12 ? 'am' : 'pm';
          options.push(`${formattedHour}:${formattedMinute} ${period}`);
        }
      }
    }
    return options;
  };

  return (
    <>
      <ShowLoading />
      <Header />
      <div className="makeappointment_container">
        <h1 className="makeappointment_heading">Schedule Your Appointment</h1>
        <form className="makeappointment_form" onSubmit={handleSubmit}>
          <div className="left_inputs">
            <div className="makeappointment_input_container">
              <label className="makeappointment_label" htmlFor="ownerName">Owner Name:</label>
              <input className={`makeappointment_input_text ${ownerNameError ? 'error' : ''}`} type="text" id="ownerName" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required />
              {ownerNameError && <p className="error-message">{ownerNameError}</p>}
            </div>
            <div className="makeappointment_input_container">
              <label className="makeappointment_label" htmlFor="ownerEmail">Owner Email:</label>
              <input className="makeappointment_input_email" type="email" id="ownerEmail" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} required />
            </div>
            <div className="makeappointment_input_container">
              <label className="makeappointment_label" htmlFor="ownerContact">Owner Contact No:</label>
              <input className={`makeappointment_input_tel ${ownerContactError ? 'error' : ''}`} type="tel" id="ownerContact" value={ownerContact} onChange={(e) => setOwnerContact(e.target.value)} required />
              {ownerContactError && <p className="error-message">{ownerContactError}</p>}
            </div>
            <div className="makeappointment_input_container">
              <label className="makeappointment_label" htmlFor="petType">Pet Type:</label>
              <input className="makeappointment_input_text" type="text" id="petType" value={petType} onChange={(e) => setPetType(e.target.value)} required />
            </div>
          </div>
          <div className="right_inputs">
            <div className="makeappointment_input_container">
              <label className="makeappointment_label" htmlFor="selectService">Select Service:</label>
              <select className="makeappointment_select" id="selectService" value={selectService} onChange={(e) => setSelectService(e.target.value)} required>
                <option value="">--Please select--</option>
                <option value="Veterinary Service">Veterinary Service</option>
                <option value="Groome Service">Groome Service</option>
              </select>
            </div>
            <div className="makeappointment_input_container">
              <label className="makeappointment_label" htmlFor="selectDate">Select Date:</label>
              <input className="makeappointment_input_date" type="date" id="selectDate" value={selectDate} onChange={(e) => setSelectDate(e.target.value)} required />
            </div>
            <div className="makeappointment_input_container">
              <label className="makeappointment_label" htmlFor="selectTime">Select Time:</label>
              <select className="makeappointment_select" id="selectTime" value={selectTime} onChange={(e) => setSelectTime(e.target.value)} required>
                <option value="">--Please select--</option>
                {generateTimeOptions().map((timeOption, index) => (
                  <option key={index} value={timeOption}>{timeOption}</option>
                ))}
              </select>
            </div>
            <div className="makeappointment_input_container">
              <label className="makeappointment_label" htmlFor="selectProfession">Select Profession:</label>
              <select className="makeappointment_select" id="selectProfession" value={selectProfession} onChange={(e) => setSelectProfession(e.target.value)} required>
                <option value="">--Please select--</option>
                {professionOptions.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="makeappointment_button" type="submit">Submit</button>
        </form>
      </div>
      <Footer /> 
    </>
  );
};

export default MakeAppointment;
