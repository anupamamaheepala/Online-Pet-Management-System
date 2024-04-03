import React, { useState } from 'react';
import '../css/makeappointment.css';
import axios from 'axios';

const MakeAppointment = () => {
  // State variables to store form data
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [petType, setPetType] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send form data to server using Axios POST request
      await axios.post('http://localhost:9000/api/appointments', {
        ownerName,
        ownerEmail,
        ownerContact,
        petType
      });

      // Clear form fields after successful submission
      setOwnerName('');
      setOwnerEmail('');
      setOwnerContact('');
      setPetType('');
    } catch (error) {
      // Handle any errors
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="makeappointment_container">
      <h1 className="makeappointment_heading">Appointment Form</h1>
      <form className="makeappointment_form" onSubmit={handleSubmit}>
        <div className="left_inputs">
          <div className="makeappointment_input_container">
            <label className="makeappointment_label" htmlFor="ownerName">Owner Name:</label>
            <input className="makeappointment_input_text" type="text" id="ownerName" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required />
          </div>
          <div className="makeappointment_input_container">
            <label className="makeappointment_label" htmlFor="ownerEmail">Owner Email:</label>
            <input className="makeappointment_input_email" type="email" id="ownerEmail" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} required />
          </div>
          <div className="makeappointment_input_container">
            <label className="makeappointment_label" htmlFor="ownerContact">Owner Contact No:</label>
            <input className="makeappointment_input_tel" type="tel" id="ownerContact" value={ownerContact} onChange={(e) => setOwnerContact(e.target.value)} required />
          </div>
          <div className="makeappointment_input_container">
            <label className="makeappointment_label" htmlFor="petType">Pet Type:</label>
            <input className="makeappointment_input_text" type="text" id="petType" value={petType} onChange={(e) => setPetType(e.target.value)} required />
          </div>
        </div>
        <button className="makeappointment_button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MakeAppointment;









       {/* <div className="right_inputs">
          <div className="makeappointment_input_container">
            <label className="makeappointment_label" htmlFor="selectService">Select Service:</label>
            <select className="makeappointment_select" id="selectService" value={selectService} onChange={(e) => setSelectService(e.target.value)} required>
              <option value="">--Please select--</option>
              <option value="Grooming">Grooming</option>
              <option value="Check-up">Check-up</option>
              <option value="Vaccination">Vaccination</option>
            </select>
          </div>
          <div className="makeappointment_input_container">
            <label className="makeappointment_label" htmlFor="selectDate">Select Date:</label>
            <input className="makeappointment_input_date" type="date" id="selectDate" value={selectDate} onChange={(e) => setSelectDate(e.target.value)} required />
          </div>
          <div className="makeappointment_input_container">
            <label className="makeappointment_label" htmlFor="selectTime">Select Time:</label>
            <input className="makeappointment_input_time" type="time" id="selectTime" value={selectTime} onChange={(e) => setSelectTime(e.target.value)} required />
          </div>
          <div className="makeappointment_input_container">
            <label className="makeappointment_label" htmlFor="selectProfession">Select Profession:</label>
            <select className="makeappointment_select" id="selectProfession" value={selectProfession} onChange={(e) => setSelectProfession(e.target.value)} required>
              <option value="">--Please select--</option>
              <option value="Veterinarian">Veterinarian</option>
              <option value="Pet Groomer">Pet Groomer</option>
              <option value="Pet Sitter">Pet Sitter</option>
            </select>
          </div>
  </div>*/}