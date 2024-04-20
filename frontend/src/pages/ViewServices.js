import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/viewservices.css';

const ViewServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:9000/services/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleEdit = (id) => {
    // Handle edit functionality
    console.log('Edit service with id:', id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/services/delete/${id}`);
      fetchServices(); // Refresh the list of services after deletion
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="view-services-container">
      <h1>Services</h1>
      {services.map(service => (
        <div key={service._id} className="service-item">
          <h2 className="service-title">{service.title}</h2>
          <p className="service-type">Type: {service.type}</p>
          <p className="service-description">Description: {service.description}</p>
          <div className="service-buttons">
            <button className="view-services-update-button" onClick={() => handleEdit(service._id)}>Edit</button>
            <button className="view-services-delete-button" onClick={() => handleDelete(service._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewServices;
