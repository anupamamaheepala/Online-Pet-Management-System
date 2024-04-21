import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/groomenotifications.css';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import GroomeHeader from '../components/Groome components/GroomerHeader';

const GroomeNotifications = () => {
  const [appointments, setAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState(
    JSON.parse(localStorage.getItem('acceptedGroomeAppointments')) || []
  );
  const [rejectedAppointments, setRejectedAppointments] = useState(
    JSON.parse(localStorage.getItem('rejectedGroomeAppointments')) || []
  );

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:9000/appointment/appointments');
      const appointmentsData = response.data.filter(appointment => appointment.selectService === 'Groome Service');
      console.log('Groome Appointments fetched:', appointmentsData);
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
      localStorage.setItem('acceptedGroomeAppointments', JSON.stringify([...acceptedAppointments, appointmentId]));
      Swal.fire({
        icon: 'success',
        title: 'Appointment Accepted',
        text: `You have successfully accepted the appointment.`,
      });
      fetchAppointments(); // Refresh appointments after accepting
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
      localStorage.setItem('rejectedGroomeAppointments', JSON.stringify([...rejectedAppointments, appointmentId]));
      Swal.fire({
        icon: 'success',
        title: 'Appointment Rejected',
        text: `You have successfully rejected the appointment.`,
      });
      fetchAppointments(); // Refresh appointments after rejecting
    } catch (error) {
      console.error(`Error rejecting appointment ${appointmentId}:`, error);
    }
  };

  return (
    <>
      <GroomeHeader />
      <div>
        <h1>Groome Notifications</h1>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id} className="groomenotification_appointment_container">
              <span className="groomenotification_appointment_info">
                {appointment.ownerName} has made an appointment for {appointment.selectService}
              </span>
              <div className="groomenotification_button_group">
                {acceptedAppointments.includes(appointment._id) && (
                  <span className="groomenotification_accepted_text">Accepted</span>
                )}
                {rejectedAppointments.includes(appointment._id) && (
                  <span className="groomenotification_rejected_text">Rejected</span>
                )}
                {!acceptedAppointments.includes(appointment._id) &&
                  !rejectedAppointments.includes(appointment._id) && (
                    <>
                      <button
                        className="groomenotification_accept_button"
                        onClick={() => handleAccept(appointment._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="groomenotification_reject_button"
                        onClick={() => handleReject(appointment._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
              </div>
              <hr className="groomenotification_divider" />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default GroomeNotifications;
