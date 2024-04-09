import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/appointment/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <h2>My Appointments</h2>
      <div className='appointments-container'>
        <table className='appointments-table'>
          <thead>
            <tr>
              <th>Owner Name</th>
              <th>Owner Email</th>
              <th>Owner Contact</th>
              <th>Pet Type</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Profession</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment._id}>
                <td>{appointment.ownerName}</td>
                <td>{appointment.ownerEmail}</td>
                <td>{appointment.ownerContact}</td>
                <td>{appointment.petType}</td>
                <td>{appointment.selectService}</td>
                <td>{appointment.selectDate}</td>
                <td>{appointment.selectTime}</td>
                <td>{appointment.selectProfession}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyAppointments;
