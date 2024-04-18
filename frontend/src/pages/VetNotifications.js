import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/vetnotifications.css';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import VetHeader from '../components/Vet components/VetHeader';

const VetNotifications = () => {
  // Initialize appointments from local storage or an empty array if it doesn't exist
  const [appointments, setAppointments] = useState(
    JSON.parse(localStorage.getItem('appointments')) || []
  );

  useEffect(() => {
    // Fetch appointments when the component mounts
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:9000/appointment/appointments');
      const appointmentsData = response.data;
      console.log('Appointments fetched:', appointmentsData); // Log fetched appointments
      localStorage.setItem('appointments', JSON.stringify(appointmentsData));
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  
  const handleAccept = async (appointmentId) => {
    try {
      // Send a PUT request to update the IsAccept field to true
      await axios.put(`http://localhost:9000/appointment/appointments/${appointmentId}`, {
        IsAccept: true
      });
      
      // Update the state to reflect the change, removing the accepted appointment
      setAppointments((prevAppointments) => 
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );

      // Show a SweetAlert success message
      Swal.fire({ 
        icon: 'success', 
        title: 'Appointment Accepted', 
        text: `You have successfully accepted the appointment.`,
      });
    } catch (error) {
      console.error(`Error accepting appointment ${appointmentId}:`, error);
    }
  };

  const handleReject = (appointmentId) => {
    try {
      // Update the state to remove the rejected appointment
      setAppointments((prevAppointments) => 
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );

      // Show a SweetAlert success message
      Swal.fire({ 
        icon: 'success', 
        title: 'Appointment Rejected', 
        text: `You have successfully rejected the appointment.`,
      });
    } catch (error) {
      console.error(`Error rejecting appointment ${appointmentId}:`, error);
    }
  };

  return (
    <>
      <AdminHeader/>
      <VetHeader/>
      <div>
        <h1>Vet Notifications</h1>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id} className="vetnotification_appointment_container">
              <span className="vetnotification_appointment_info">
                {appointment.ownerName} made an appointment for {appointment.selectService}
              </span>
              <div className="vetnotification_button_group">
                <button
                  className="vetnotification_accept_button"
                  onClick={() => handleAccept(appointment._id)}
                  disabled={appointment.IsAccept} // Disable the button if the appointment is already accepted
                >
                  Accept
                </button>
                <button
                  className="vetnotification_reject_button"
                  onClick={() => handleReject(appointment._id)}
                >
                  Reject
                </button>
              </div>
              <hr className="vetnotification_divider" /> {/* Horizontal line after each appointment */}
            </li>
          ))}
        </ul>
      </div>
      <Footer/>
    </>
  );
};

export default VetNotifications;
