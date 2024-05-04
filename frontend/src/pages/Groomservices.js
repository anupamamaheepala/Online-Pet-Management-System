// Groomservices.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShowLoading from '../components/ShowLoading';
import '../css/groomeservices.css';

function Groomservices() {
  const images = ['groome1.jpg', 'groome2.jpg', 'groome3.jpg', 'groome4.jpg', 'groome5.jpg'];
  const [currentImage, setCurrentImage] = useState(0);
  const [services, setServices] = useState([]);
  const [groomers, setGroomers] = useState([]);
  const [selectedGroomerId, setSelectedGroomerId] = useState(null); // New state variable

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage + images.length - 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, [currentImage]);

  useEffect(() => {
    fetchServices();
    fetchGroomers();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:9000/services/services');
      const groomeServices = response.data.filter(service => service.type === 'Groome Service');
      setServices(groomeServices);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };
  
  // Fetch and display available groomers
  const fetchGroomers = async () => {
    try {
      const response = await axios.get('http://localhost:9000/staff');
      const groomerStaff = response.data.filter(staff => staff.designation === "Groomer");
      setGroomers(groomerStaff);
    } catch (error) {
      console.error('Error fetching groomers:', error);
    }
  };

  // Function to handle click on groomer name
  const handleGroomerClick = (groomerId) => {
    setSelectedGroomerId(prevId => (prevId === groomerId ? null : groomerId)); // Toggle selected groomer ID
  };

  return (
    <>
      <ShowLoading />
      <Header />
      <div className="image-slider">
        <div className="upper-text">
          <p className="welcome-text">
            Welcome to Pet Zone Grooming Salon, where pampering your furry friend is our passion. Let's make your pet look and feel their best!
          </p>
          <Link to="/Makeappointment" className="appointment-button">
            Make an appointment
          </Link>
        </div>
        <button className="arrow left" onClick={prevImage}>
          ◀
        </button>
        <img className="slider-image" src={`/images/${images[currentImage]}`} alt="Grooming Service" />
        <button className="arrow right" onClick={nextImage}>
          ▶
        </button>
        <div className="dots-container">
          {images.map((_, index) => (
            <span key={index} className={index === currentImage ? 'dot active' : 'dot'} onClick={() => setCurrentImage(index)}></span>
          ))}
        </div>
      </div>
      <div className="groom-services-container">
        <div className="service-list-container">
          <h2>Available Grooming Services</h2>
          <ul className="service-list">
            {services.map((service) => (
              <li key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="square-placeholder">
          <h1>Available Groomers</h1>
          <ul>
            {groomers.map(groomer => (
              <li key={groomer._id}>
                <span className="groomer-name" onClick={() => handleGroomerClick(groomer._id)}>
                  <button className={`toggle-button ${selectedGroomerId === groomer._id ? 'active' : ''}`} onClick={(e) => e.preventDefault()}>{selectedGroomerId === groomer._id ? '-' : <strong>+</strong>}</button> {/* Toggle details */}
                  {groomer.sfirstname} {groomer.slastname}
                </span>
                {selectedGroomerId === groomer._id && ( // Display details only for the selected groomer
                  <div className="groomer-details">
                    <p>Qualifications: {groomer.qualifications}</p>
                    <p>Email: {groomer.semail}</p>
                    <p>Contact Number: {groomer.scontactNumber}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Groomservices;
