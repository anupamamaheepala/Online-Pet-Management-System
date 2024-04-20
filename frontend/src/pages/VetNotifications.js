import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/vetnotifications.css';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import VetHeader from '../components/Vet components/VetHeader';

const VetNotifications = () => {
  const [appointments, setAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState(
    JSON.parse(localStorage.getItem('acceptedAppointments')) || []
  );
  const [rejectedAppointments, setRejectedAppointments] = useState(
    JSON.parse(localStorage.getItem('rejectedAppointments')) || []
  );

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:9000/appointment/appointments');
      const appointmentsData = response.data;
      console.log('Appointments fetched:', appointmentsData);
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleAccept = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:9000/appointment/appointments/${appointmentId}`, { IsAccept: true });
      setAcceptedAppointments([...acceptedAppointments, appointmentId]);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );
      localStorage.setItem('acceptedAppointments', JSON.stringify([...acceptedAppointments, appointmentId]));
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
      setRejectedAppointments([...rejectedAppointments, appointmentId]);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );
      localStorage.setItem('rejectedAppointments', JSON.stringify([...rejectedAppointments, appointmentId]));
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
      <AdminHeader />
      <VetHeader />
      <div>
        <h1>Vet Notifications</h1>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id} className="vetnotification_appointment_container">
              <span className="vetnotification_appointment_info">
                {appointment.ownerName} has made an appointment for {appointment.selectService}
              </span>
              <div className="vetnotification_button_group">
                {acceptedAppointments.includes(appointment._id) && (
                  <span className="vetnotification_accepted_text">Accepted</span>
                )}
                {rejectedAppointments.includes(appointment._id) && (
                  <span className="vetnotification_rejected_text">Rejected</span>
                )}
                {!acceptedAppointments.includes(appointment._id) &&
                  !rejectedAppointments.includes(appointment._id) && (
                    <>
                      <button
                        className="vetnotification_accept_button"
                        onClick={() => handleAccept(appointment._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="vetnotification_reject_button"
                        onClick={() => handleReject(appointment._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
              </div>
              <hr className="vetnotification_divider" />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default VetNotifications;