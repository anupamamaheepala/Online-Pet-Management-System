import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/myappointments.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerEmail: '',
    ownerContact: '',
    petType: '',
    selectService: '',
    selectDate: '',
    selectTime: '',
    selectProfession: ''
  });
  const updateFormRef = useRef(null); // Create a ref for the update form

  useEffect(() => {
    // Fetch appointments when the component mounts
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:9000/appointment/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleRemove = async (appointmentId) => {
    try {
      // Send a DELETE request to the backend
      await axios.delete(`http://localhost:9000/appointment/appointments/${appointmentId}`);

      // After successful deletion, update the appointments state
      setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
      // Show success message
      Swal.fire({ title: 'Success', text: 'Successfully removed appointment', showConfirmButton: false, icon: 'success', timer: 1500 });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      Swal.fire({ title: 'Error', text: 'Failed to remove appointment', icon: 'error', confirmButtonText: 'OK' });
    }
  };

  const handleModify = (appointment) => {
    // Set the editing appointment and pre-fill the form with its details
    setEditingAppointment(appointment);
    setFormData({
      ownerName: appointment.ownerName,
      ownerEmail: appointment.ownerEmail,
      ownerContact: appointment.ownerContact,
      petType: appointment.petType,
      selectService: appointment.selectService,
      selectDate: appointment.selectDate,
      selectTime: appointment.selectTime,
      selectProfession: appointment.selectProfession
    });
    // Scroll to the update form
    updateFormRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the appointment
      await axios.put(`http://localhost:9000/appointment/appointments/${editingAppointment._id}`, formData);

      // Show success message
      Swal.fire({ title: 'Success', text: 'Appointment updated successfully', icon: 'success', confirmButtonText: 'OK' });

      // Clear the editing appointment and form data
      setEditingAppointment(null);
      setFormData({
        ownerName: '',
        ownerEmail: '',
        ownerContact: '',
        petType: '',
        selectService: '',
        selectDate: '',
        selectTime: '',
        selectProfession: ''
      });

      // Refetch appointments to update the list
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
      Swal.fire({ title: 'Error', text: 'Failed to update appointment', icon: 'error', confirmButtonText: 'OK' });
    }
  };

  const handleCancel = () => {
    // Clear the editing appointment and form data
    setEditingAppointment(null);
    setFormData({
      ownerName: '',
      ownerEmail: '',
      ownerContact: '',
      petType: '',
      selectService: '',
      selectDate: '',
      selectTime: '',
      selectProfession: ''
    });
  };

  const handlePayNow = (appointmentId) => {
    // Implement pay now functionality
    console.log("Pay now for appointment:", appointmentId);
  };

  return (
    <>
      <Header />
      <div>
        <h1>My Appointments</h1>
        <ul>
          {appointments.map(appointment => (
            <li key={appointment._id} className="appointment-item">
              <section>
                <p>Owner Name: {appointment.ownerName}</p>
                <p>Email: {appointment.ownerEmail}</p>
                <p>Contact: {appointment.ownerContact}</p>
                <p>Pet Type: {appointment.petType}</p>
                <p>Service: {appointment.selectService}</p>
                <p>Appointment Date: {appointment.selectDate}</p>
                <p>Appointment Time: {appointment.selectTime}</p>
                <p>Professioner: {appointment.selectProfession}</p>
                <p>Appointment Status: {appointment.IsAccept ? 'Approved' : 'Pending'}</p>
              </section>
              <div className="button-container">
                {(!appointment.IsAccept && !appointment.IsPaid) ? (
                  <>
                    <button className="myappointment_modify_button" onClick={() => handleModify(appointment)}>Modify</button>
                    <button className="myappointment_remove_button" onClick={() => handleRemove(appointment._id)}>Remove</button>
                  </>
                ) : (
                  <>
                    {!appointment.IsPaid && (
                     <button className="myappointment_paynow_button" onClick={() => handlePayNow(appointment._id)}>Pay Now</button>
                    )}
                    <button className="myappointment_remove_button" onClick={() => handleRemove(appointment._id)}>Remove</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div ref={updateFormRef}></div>
      {editingAppointment && (
        <div className="edit-form">
          <h2>Update Appointment</h2>
          <form onSubmit={handleSubmit}>
            <label>Owner Name:</label>
            <input type="text" name="ownerName" value={formData.ownerName} onChange={handleInputChange} required />
            <label>Email:</label>
            <input type="email" name="ownerEmail" value={formData.ownerEmail} onChange={handleInputChange} required />
            <label>Contact:</label>
            <input type="tel" name="ownerContact" value={formData.ownerContact} onChange={handleInputChange} required />
            <label>Pet Type:</label>
            <input type="text" name="petType" value={formData.petType} onChange={handleInputChange} required />
            <label>Select Service:</label>
            <select name="selectService" value={formData.selectService} onChange={handleInputChange} required>
              <option value="">--Please select--</option>
              <option value="Grooming">Grooming</option>
              <option value="Check-up">Check-up</option>
              <option value="Vaccination">Vaccination</option>
            </select>
            <label>Appointment Date:</label>
            <input type="date" name="selectDate" value={formData.selectDate} onChange={handleInputChange} required />
            <label>Appointment Time:</label>
            <input type="time" name="selectTime" value={formData.selectTime} onChange={handleInputChange} required />
            <label>Select Service:</label>
            <select name="selectProfession" value={formData.selectProfession} onChange={handleInputChange} required>
              <option value="">--Please select--</option>
              <option value="Veterinarian">Veterinarian</option>
              <option value="Pet Groomer">Pet Groomer</option>
              <option value="Pet Sitter">Pet Sitter</option>
            </select>

            <div className="button-container">
              <button type="submit">Update</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MyAppointments;
