import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import '../css/scheduleappointments.css';
import Layout from '../components/Layout';

function ScheduleAppointments() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <Layout>

    
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Pet Owner Name</Form.Label>
        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formDate">
        <Form.Label>Appointment Date</Form.Label>
        <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formStartTime">
        <Form.Label>Start Time</Form.Label>
        <Form.Control type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formEndTime">
        <Form.Label>End Time</Form.Label>
        <Form.Control type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formService">
        <Form.Label>Service</Form.Label>
        <Form.Control as="select" value={service} onChange={e => setService(e.target.value)}>
          <option value="veterinary">Veterinary Services</option>
          <option value="grooming">Grooming Services</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Layout>
  );
}

export default ScheduleAppointments;
