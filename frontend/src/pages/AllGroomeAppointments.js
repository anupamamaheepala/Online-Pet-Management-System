import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import GroomerHeader from '../components/Groome components/GroomerHeader';
import Footer from '../components/Footer';
import axios from 'axios';

function AllGroomeAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch grooming appointments data
    axios.get('http://localhost:9000/appointment/grooming-appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching grooming appointments:', error);
      });
  }, []);

  return (
    <>
      <AdminHeader />
      <GroomerHeader />
      <div>
        <h1>All Appointments for Groomer</h1>
        <ul>
          {appointments.map(appointment => (
            <li key={appointment._id}>
              {/* Display appointment details */}
              {appointment.ownerName} - {appointment.selectService}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default AllGroomeAppointments;
