import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchUserAppointments();
  }, []);

  const fetchUserAppointments = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get('http://localhost:9000/appointment/user-appointments', {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error('Error fetching user appointments:', error);
    }
  };
  return (
    <>
    <Header/>
    
    <div>
      <h1>My Appointments</h1>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment._id}>
            <p>Service: {appointment.selectService}</p>
            <p>Date: {appointment.selectDate}</p>
            <p>Time: {appointment.selectTime}</p>
           
          </li>
        ))}
      </ul>
    </div>
        <Footer/>
    </>
  );
};

export default MyAppointments;
