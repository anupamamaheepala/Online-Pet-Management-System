// Vetservices.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShowLoading from '../components/ShowLoading';
import '../css/vetservices.css';

function Vetservices() {
  const images = ['vetback1.jpg', 'vetback2.jpg', 'vetback3.jpg', 'vetback4.jpg', 'vetback5.jpg'];
  const [currentImage, setCurrentImage] = useState(0);
  const [showDescription, setShowDescription] = useState('');
  const [services, setServices] = useState([]);
  const [veterinarians, setVeterinarians] = useState([]);
  const [selectedVetId, setSelectedVetId] = useState(null); // New state variable

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
    fetchVeterinarians();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:9000/services/services');
      const vetServices = response.data.filter(service => service.type === "Veterinary Service");
      setServices(vetServices);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };
  
  // Fetch and display available veterinarians
  const fetchVeterinarians = async () => {
    try {
      const response = await axios.get('http://localhost:9000/staff');
      const vetStaff = response.data.filter(staff => staff.designation === "Veterinarian");
      setVeterinarians(vetStaff);
    } catch (error) {
      console.error('Error fetching veterinarians:', error);
    }
  };

  // Function to handle click on veterinarian name
  const handleVetClick = (vetId) => {
    setSelectedVetId(prevId => (prevId === vetId ? null : vetId)); // Toggle selected veterinarian ID
  };

  return (
    <>
      <ShowLoading />
      <Header />
      <div className="image-slider">
        <div className="upper-text">
          <p className="welcome-text">
            Welcome to Pet Zone Veterinary Clinic, where we provide compassionate care for your beloved pets. Your pet's health is our top priority!
          </p>
          <Link to="/Makeappointment" className="appointment-button">
            Make an appointment
          </Link>
        </div>
        <button className="arrow left" onClick={prevImage}>
          ◀
        </button>
        <img className="slider-image" src={`/images/${images[currentImage]}`} alt="Veterinary Service" />
        <button className="arrow right" onClick={nextImage}>
          ▶
        </button>
        <div className="dots-container">
          {images.map((_, index) => (
            <span key={index} className={index === currentImage ? 'dot active' : 'dot'} onClick={() => setCurrentImage(index)}></span>
          ))}
        </div>
      </div>
      <div className="vetservices-container">
        <div className="service-list-container-vetservices">
          <h2>Available Veterinary Services</h2>
          <ul className="service-list-vetservices">
            {services.map((service) => (
              <li key={service._id} onClick={() => setShowDescription(service.title)}>
                <span className="toggle-icon">{showDescription === service.title ? '-' : '+'}</span>
                <h3>{service.title}</h3>
                {showDescription === service.title && <p>{service.description}</p>}
              </li>
            ))}
          </ul>
        </div>
        <div className="square-placeholder">
          <h1>Available Veterinarians</h1>
          <ul>
            {veterinarians.map(vet => (
              <li key={vet._id}>
                <span className="vet-name" onClick={() => handleVetClick(vet._id)} style={{marginTop: '10px'}}> {/* Added top margin */}
                  <button className={`toggle-button ${selectedVetId === vet._id ? 'active' : ''}`} onClick={(e) => e.preventDefault()}>{selectedVetId === vet._id ? '-' : <strong>+</strong>}</button> {/* Toggle details */}
                {vet.sfirstname} {vet.slastname}
                </span>
                {selectedVetId === vet._id && ( 
                  <div className="vet-details">
                    <p>Qualifications: {vet.qualifications}</p>
                    <p>Email: {vet.semail}</p>
                    <p>Contact Number: {vet.scontactNumber}</p>
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

export default Vetservices;
