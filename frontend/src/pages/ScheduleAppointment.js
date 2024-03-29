import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../css/scheduleappointments.css';
import Header from '../components/Header'; 
import Footer from '../components/Footer';

function ScheduleAppointments() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [petType, setPetType] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [veterinarian, setVeterinarian] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Construct form data object
      const formData = {
        name,
        email,
        contactNumber,
        petType,
        service,
        date,
        startTime,
        veterinarian
      };
  
      // Send form data to backend
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        // Form submission successful
        alert('Appointment scheduled successfully!');
      } else {
        // Form submission failed
        alert('Failed to schedule appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  

  return (
    <>
      <Header />
      <div className="scheduleappointments-container my-5">
        <Form onSubmit={handleSubmit} className="scheduleappointments-form p-5 bg-light border rounded">
          <Row className="g-3">
            <Col>
              <Form.Group controlId="formName">
                <Form.Label className="scheduleappointments-label">Pet Owner Name</Form.Label>
                <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} className="scheduleappointments-input" />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label className="scheduleappointments-label">E-mail</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} className="scheduleappointments-input" />
              </Form.Group>

              <Form.Group controlId="formContactNumber">
                <Form.Label className="scheduleappointments-label">Contact Number</Form.Label>
                <Form.Control type="text" value={contactNumber} onChange={e => setContactNumber(e.target.value)} className="scheduleappointments-input" />
              </Form.Group>

              <Form.Group controlId="formPetType">
                <Form.Label className="scheduleappointments-label">Pet Type</Form.Label>
                <Form.Control type="text" value={petType} onChange={e => setPetType(e.target.value)} className="scheduleappointments-input" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formService">
                <Form.Label className="scheduleappointments-label">Select Service</Form.Label>
                <Form.Control as="select" value={service} onChange={e => setService(e.target.value)} className="scheduleappointments-select">
                  <option value="">--select--</option>
                  <option value="veterinary">Veterinary Services</option>
                  <option value="grooming">Grooming Services</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formDate">
                <Form.Label className="scheduleappointments-label">Appointment Date</Form.Label>
                <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} className="scheduleappointments-input" />
              </Form.Group>

              <Form.Group controlId="formStartTime">
                <Form.Label className="scheduleappointments-label">Appointment Time</Form.Label>
                <Form.Control type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="scheduleappointments-input" />
              </Form.Group>

              <Form.Group controlId="formVeterinarian">
                <Form.Label className="scheduleappointments-label">Select Veterinarian/Groomer</Form.Label>
                <Form.Control as="select" value={veterinarian} onChange={e => setVeterinarian(e.target.value)} className="scheduleappointments-select">
                  <option value="">--select--</option>
                  <option value="veterinarian1">Veterinarian 1</option>
                  <option value="groomer1">Groomer 1</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="primary" type="submit" className="scheduleappointments-custom-submit-btn">
              Submit
            </Button>
          </div>
        </Form>
  </div>

      <Footer /> 
    </>
  );
}

export default ScheduleAppointments;
