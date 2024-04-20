import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:9000/services/services'); // Update the URL path
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h1>Services</h1>
      <ul>
        {services.map(service => (
          <li key={service._id}>
            <h2>{service.title}</h2>
            <p>Type: {service.type}</p>
            <p>Description: {service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewServices;