import React, { useState } from 'react';
import '../css/makeappointment.css';
import axios from 'axios';
//import { toast } from 'react-toastify';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import ShowLoading from '../components/ShowLoading';
import Swal from 'sweetalert2';




const MakeAppointment = () => {
  // State variables to store form data
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [petType, setPetType] = useState('');
  const [selectService, setSelectService] = useState('');
  const [selectDate, setSelectDate] = useState('');
  const [selectTime, setSelectTime] = useState('');
  const [selectProfession, setSelectProfession] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

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

    // Show SweetAlert message
    Swal.fire({ icon: 'success', title: 'Appointment Created Successfully', showConfirmButton: false, timer: 1500 });
      /*toast.success('Appointment created successfully');*/

      // Clear form fields after successful submission
      setOwnerName('');
      setOwnerEmail('');
      setOwnerContact('');
      setPetType('');
      setSelectService('');
      setSelectDate('');
      setSelectTime('');
      setSelectProfession('');
    } catch (error) {
       // Show error message
    Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to create appointment. Please try again later.', confirmButtonText: 'OK' });
      /*toast.error('Failed to create appointment');*/
      // Handle any errors
      console.error('Error submitting form:', error);
    }
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
        <div className="right_inputs">
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
        </div>
        <button className="makeappointment_button" type="submit">Submit</button>
      </form>
     
    </div>
    <Footer /> 
    </>
  );
};

export default MakeAppointment;