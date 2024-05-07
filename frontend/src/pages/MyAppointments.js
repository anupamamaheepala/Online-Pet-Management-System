import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/myappointments.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

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
  const [appointmentCount, setAppointmentCount] = useState(0);
  const updateFormRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:9000/appointment/appointments');
      setAppointments(response.data);
      setAppointmentCount(response.data.length);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleRemove = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:9000/appointment/appointments/${appointmentId}`);
      setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
      setAppointmentCount(appointmentCount - 1);
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleModify = (appointment) => {
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
    updateFormRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:9000/appointment/appointments/${editingAppointment._id}`, formData);
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
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleCancel = () => {
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

  const handlePayNow = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:9000/appointment/appointments/${appointmentId}`, { IsPaid: true });
      fetchAppointments();
      navigate('/Payerinfo');
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <>
      <Header />
      <div>
        <h1>My Appointments</h1>
        <p>Appointment Count: {appointmentCount}</p>
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
                {appointment.IsPaid && appointment.IsAccept ? (
                  <p>Payment Done</p>
                ) : null}
              </section>
              <div className="button-container">
                {(!appointment.IsPaid && !appointment.IsAccept) ? (
                  <>
                    <button className="myappointment_modify_button" onClick={() => handleModify(appointment)}>Modify</button>
                    <button className="myappointment_remove_button" onClick={() => handleRemove(appointment._id)}>Remove</button>
                  </>
                ) : !appointment.IsPaid && appointment.IsAccept ? (
                  <button className="myappointment_paynow_button" onClick={() => handlePayNow(appointment._id)}>Pay Now</button>
                ) : null}
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
              <option value="Check-up">Veterinary</option>
            </select>
            <label>Appointment Date:</label>
            <input type="date" name="selectDate" value={formData.selectDate} onChange={handleInputChange} required />
            <label>Appointment Time:</label>
            <input type="time" name="selectTime" value={formData.selectTime} onChange={handleInputChange} required />
            <label>Select Profession:</label>
            <select name="selectProfession" value={formData.selectProfession} onChange={handleInputChange} required>
              <option value="">--Please select--</option>
              <option value="Veterinarian">Subodhi Karunarathna</option>
              <option value="Pet Groomer">Sathyajith Abayawardhana</option>
              <option value="Pet Sitter">Dilushan Rajapaksha</option>
              <option value="Pet Sitter">Rashini De Silva</option>
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
