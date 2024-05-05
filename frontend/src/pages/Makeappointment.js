import React, { useState, useEffect } from 'react';
import '../css/makeappointment.css';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShowLoading from '../components/ShowLoading';
import Swal from 'sweetalert2';

const MakeAppointment = () => {
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [petType, setPetType] = useState('');
  const [selectService, setSelectService] = useState('');
  const [selectDate, setSelectDate] = useState('');
  const [selectTime, setSelectTime] = useState('');
  const [selectProfession, setSelectProfession] = useState('');
  const [allProfessions, setAllProfessions] = useState([]);
  const [professionOptions, setProfessionOptions] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [ownerNameError, setOwnerNameError] = useState('');
  const [ownerContactError, setOwnerContactError] = useState('');

  useEffect(() => {
    fetchProfessionOptions();
  }, []);

  useEffect(() => {
    filterProfessionsByService();
  }, [selectService]);

  const fetchProfessionOptions = async () => {
    try {
      const response = await axios.get('http://localhost:9000/staff');
      setAllProfessions(response.data);
    } catch (error) {
      console.error('Error fetching profession options:', error);
    }
  };

  const filterProfessionsByService = () => {
    const filteredOptions = allProfessions.filter(staff => {
      return (selectService === "Veterinary Service" && staff.designation === "Veterinarian") ||
             (selectService === "Grooming Service" && staff.designation === "Groomer");
    }).map(staff => ({
      value: staff.staffId,
      label: `${staff.sfirstname} ${staff.slastname} (${staff.designation})`
    }));
    setProfessionOptions(filteredOptions);
    setSelectProfession(''); // Reset profession selection
  };

  useEffect(() => {
    if (selectDate && selectService && selectProfession) {
      fetchBookedTimes();
    } else {
      setBookedTimes([]); // Clear booked times if not all fields needed are selected
    }
  }, [selectDate, selectService, selectProfession]);

  const fetchBookedTimes = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/appointment/booked-times`, {
        params: { selectDate, selectService }
      });
      setBookedTimes(response.data);
    } catch (error) {
      console.error('Error fetching booked times:', error);
    }
  };
  

  const validateForm = () => {
    let isValid = true;
    if (/\d/.test(ownerName)) {
      setOwnerNameError('Owner name cannot contain digits');
      isValid = false;
    } else {
      setOwnerNameError('');
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
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
      clearForm();
      Swal.fire({
        icon: 'success',
        title: 'Appointment Scheduled Successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        Swal.fire({
          icon: 'info',
          title: 'Make the payment for Appointment after Approved',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/MyAppointments';
          }
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create appointment. Please try again later.',
        confirmButtonText: 'OK'
      });
      console.error('Error submitting form:', error);
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour <= 16; hour++) {
      if (hour !== 12) {
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        const period = hour < 12 ? 'am' : 'pm';
        const timeOption = `${formattedHour}:00 ${period}`;
        const isBooked = bookedTimes.includes(timeOption);
        options.push({
            time: timeOption,
            isBooked: isBooked
        });
      }
    }
    return options;
  };
  

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
              {ownerContactError && <p className="error-message">${ownerContactError}</p>}
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
                <option value="Grooming Service">Grooming Service</option>
              </select>
            </div>
            <div className="makeappointment_input_container">
              <label className="makeappointment_label" htmlFor="selectDate">Select Date:</label>
              <input className="makeappointment_input_date" type="date" id="selectDate" value={selectDate} onChange={(e) => setSelectDate(e.target.value)} min={getCurrentDate()} required />
            </div>
            <div className="makeappointment_input_container">
              <label className="makeappointment_label" htmlFor="selectProfession">Select Profession:</label>
              <select className="makeappointment_select" id="selectProfession" value={selectProfession} onChange={(e) => {
                setSelectProfession(e.target.value);
                setSelectTime(''); // Reset time selection when profession changes
              }} required>
                <option value="">--Please select--</option>
                {professionOptions.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="makeappointment_input_container">
              <label className="makeappointment_label" htmlFor="selectTime">Select Time:</label>
              <select className="makeappointment_select" id="selectTime" value={selectTime} onChange={(e) => setSelectTime(e.target.value)} required disabled={!selectProfession}>
                <option value="">--Please select--</option>
                {selectProfession && generateTimeOptions().map((option, index) => (
                  <option key={index} value={option.time} style={option.isBooked ? { color: 'red' } : {}}>
                    {option.time} {option.isBooked ? '(Already booked)' : '(Available)'}
                  </option>
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
